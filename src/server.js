const Hapi = require('@hapi/hapi');

// configuration
const { SERVER_CONFIG } = require('./config');

// songs
const { songsPlugin } = require('./api/songs');
const { songsValidator } = require('./validator/songs');
const { SongsService } = require('./services/postgres/SongsService');

// users
const { usersPlugin } = require('./api/users');
const { usersValidator } = require('./validator/users');
const { UsersService } = require('./services/postgres/UsersService');

// extensions
const { extensionsPlugin } = require('./api/extensions');

const init = async () => {
  // services
  const songsService = new SongsService();
  const usersService = new UsersService();

  // server
  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: ['*'] } },
  });

  // plugins
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
      plugin: extensionsPlugin,
    },
  ]);

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
