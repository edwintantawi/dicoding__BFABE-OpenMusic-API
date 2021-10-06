const Hapi = require('@hapi/hapi');
const { songsPlugin } = require('./api/songs');
const { SERVER_CONFIG } = require('./config');
const { Extensions } = require('./extensions');
const { SongsService } = require('./services/postgres/SongsService');
const { songsValidator } = require('./validator/songs');

const init = async () => {
  // services
  const songsService = new SongsService();

  // server
  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: ['*'] } },
  });

  // plugins
  await server.register({
    plugin: songsPlugin,
    options: { service: songsService, validator: songsValidator },
  });
  // extensions
  server.ext('onPreResponse', Extensions.onPreResponse);

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
