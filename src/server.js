const Hapi = require('@hapi/hapi');
const { SERVER_CONFIG } = require('./config');

const init = async () => {
  const server = Hapi.server({
    port: SERVER_CONFIG.PORT,
    host: SERVER_CONFIG.HOST,
    routes: { cors: { origin: [SERVER_CONFIG.ORIGIN] } },
  });

  server.route({
    path: '/',
    method: 'GET',
    handler: () => ({ message: 'ok' }),
  });

  await server.start();
  console.info(`Server run at ${server.info.uri}`);
};

init();
