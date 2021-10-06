const Hapi = require('@hapi/hapi');
const { songsPlugin } = require('./api/songs');
const { SERVER_CONFIG } = require('./config');
const { Extensions } = require('./extensions');
const { SongsService } = require('./services/postgres/SongsService');
const { songsValidator } = require('./validator/songs');

const init = async () => {
  // services
  const songsService = new SongsService();
  // extensions
  const extensions = new Extensions();

  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: ['*'] } },
  });

  await server.register({
    plugin: songsPlugin,
    options: { service: songsService, validator: songsValidator },
  });

  server.ext('onPreResponse', extensions.onPreResponse);

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
