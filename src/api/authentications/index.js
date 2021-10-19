const { AuthenticationsHandler } = require('./handler');
const { authenticationRoutes } = require('./routes');

const authenticationsPlugin = {
  name: 'authentications',
  version: '1.0.0',
  register: (
    server,
    { authenticationsService, usersService, tokenManager, validator }
  ) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      tokenManager,
      validator
    );
    const routes = authenticationRoutes(authenticationsHandler);
    server.route(routes);
  },
};

module.exports = { authenticationsPlugin };
