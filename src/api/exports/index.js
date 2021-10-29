const { JWT_CONFIG } = require('../../config');
const { ExportsHandler } = require('./handler');
const { exportsRoutes } = require('./routes');

const exportsPlugin = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { exportsService, playlistsService, validator }) => {
    const exportsHandler = new ExportsHandler(
      exportsService,
      playlistsService,
      validator
    );

    const routes = exportsRoutes(exportsHandler, {
      auth: JWT_CONFIG.AUTH_STRATEGY_NAME,
    });
    server.route(routes);
  },
};

module.exports = { exportsPlugin };
