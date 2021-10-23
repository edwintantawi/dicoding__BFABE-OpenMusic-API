const { CollaborationsHandler } = require('./handler');
const { collaborationRoutes } = require('./routes');
const { JWT_CONFIG } = require('../../config');

const collaborationsPlugin = {
  name: 'collaborations',
  version: '1.0.0',
  register: (
    server,
    { collaborationsService, playlistsService, validator }
  ) => {
    const collaborationsHandler = new CollaborationsHandler({
      collaborationsService,
      playlistsService,
      validator,
    });
    const routes = collaborationRoutes(collaborationsHandler, {
      auth: JWT_CONFIG.AUTH_STRATEGY_NAME,
    });
    server.route(routes);
  },
};

module.exports = { collaborationsPlugin };
