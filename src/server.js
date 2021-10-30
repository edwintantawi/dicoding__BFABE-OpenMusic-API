const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

// jwt token
const { TokenManager } = require('./tokenize/TokenManager');

// configuration
const { SERVER_CONFIG, JWT_CONFIG } = require('./config');

// songs
const { songsPlugin } = require('./api/songs');
const { songsValidator } = require('./validator/songs');
const { SongsService } = require('./services/postgres/SongsService');

// users
const { usersPlugin } = require('./api/users');
const { usersValidator } = require('./validator/users');
const { UsersService } = require('./services/postgres/UsersService');

// authentications
const { authenticationsPlugin } = require('./api/authentications');
const { AuthenticationsValidator } = require('./validator/authentications');
const {
  AuthenticationsService,
} = require('./services/postgres/AuthenticationsService');

// playlists
const { playlistsPlugin } = require('./api/playlists');
const { PlaylistsValidator } = require('./validator/playlists');
const { PlaylistsService } = require('./services/postgres/PlaylistsService');

// playlistSongs
const { playlistSongsPlugin } = require('./api/playlistSongs');
const { PlaylistSongsValidator } = require('./validator/playlistSongs');
const {
  PlaylistSongsService,
} = require('./services/postgres/PlaylistSongsService');

// collaborations
const { collaborationsPlugin } = require('./api/collaborations');
const { CollaborationsValidator } = require('./validator/collaborations');
const {
  CollaborationsService,
} = require('./services/postgres/CollaborationsService');

// exports
const { exportsPlugin } = require('./api/exports');
const { ExportsValidator } = require('./validator/exports');
const { ProducerService } = require('./services/rabbitmq/ProducerService');

// uploads
const { uploadsPlugin } = require('./api/uploads');
const { UploadsValidator } = require('./validator/uploads');
const { StorageService } = require('./services/storage/StorageService');

// redis cache
const { CacheService } = require('./services/redis/CacheService');

// extensions
const { extensionsPlugin } = require('./api/extensions');

const init = async () => {
  // path
  const storagePath = path.resolve(__dirname, 'api/uploads/file/pictures');

  // services
  const cacheService = new CacheService();
  const collaborationsService = new CollaborationsService();
  const songsService = new SongsService(cacheService);
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const playlistSongsService = new PlaylistSongsService(cacheService);
  const storageService = new StorageService(storagePath);

  // server
  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: ['*'] } },
  });

  // hapi plugins
  await server.register([{ plugin: Jwt }, { plugin: Inert }]);

  // auth strategy
  server.auth.strategy(
    JWT_CONFIG.AUTH_STRATEGY_NAME,
    JWT_CONFIG.AUTH_STRATEGY_SCHEME,
    JWT_CONFIG.AUTH_STRATEGY_OPTIONS
  );

  // custom plugin
  await server.register([
    {
      plugin: songsPlugin,
      options: { service: songsService, validator: songsValidator },
    },
    {
      plugin: usersPlugin,
      options: { service: usersService, validator: usersValidator },
    },
    {
      plugin: authenticationsPlugin,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlistsPlugin,
      options: { service: playlistsService, validator: PlaylistsValidator },
    },
    {
      plugin: playlistSongsPlugin,
      options: {
        playlistSongsService,
        playlistsService,
        songsService,
        validator: PlaylistSongsValidator,
      },
    },
    {
      plugin: collaborationsPlugin,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator,
      },
    },
    {
      plugin: exportsPlugin,
      options: {
        exportsService: ProducerService,
        playlistsService,
        validator: ExportsValidator,
      },
    },
    {
      plugin: uploadsPlugin,
      options: {
        service: storageService,
        validator: UploadsValidator,
      },
    },
    { plugin: extensionsPlugin },
  ]);

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
