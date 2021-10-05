const { SongsHandler } = require('./handler');
const { songRoutes } = require('./routes');

const songsPlugin = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator);
    const routes = songRoutes(songsHandler);
    server.route(routes);
  },
};

module.exports = { songsPlugin };
