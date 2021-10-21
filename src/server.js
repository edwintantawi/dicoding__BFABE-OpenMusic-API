const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

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

// extensions
const { extensionsPlugin } = require('./api/extensions');
const { TokenManager } = require('./tokenize/TokenManager');

const init = async () => {
  // services
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const playlistsService = new PlaylistsService();

  // server
  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: ['*'] } },
  });

  // Jwt plugins
  await server.register([{ plugin: Jwt }]);

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
    { plugin: extensionsPlugin },
  ]);

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
