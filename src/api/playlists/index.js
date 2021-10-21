const { JWT_CONFIG } = require('../../config');
const { PlaylistsHandler } = require('./handler');
const { playlistRoutes } = require('./routes');

const playlistsPlugin = {
  name: 'plugins',
  version: '1.0.0',
  register: (server, { service, validator }) => {
    const playlistsHandler = new PlaylistsHandler(service, validator);
    const routes = playlistRoutes(playlistsHandler, {
      auth: JWT_CONFIG.AUTH_STRATEGY_NAME,
    });
    server.route(routes);
  },
};

module.exports = { playlistsPlugin };
