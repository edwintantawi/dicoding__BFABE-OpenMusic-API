const Hapi = require('@hapi/hapi');
const { songsPlugin } = require('./api/songs');
const { SERVER_CONFIG } = require('./config');
const { SongsService } = require('./services/postgres/SongsService');
const { songsValidator } = require('./validator/songs');

const init = async () => {
  const songsService = new SongsService();

  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: ['*'] } },
  });

  await server.register({
    plugin: songsPlugin,
    options: { service: songsService, validator: songsValidator },
  });

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
