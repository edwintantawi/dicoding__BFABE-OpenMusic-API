const { UsersHandler } = require('./handler');
const { userRoutes } = require('./routes');

const usersPlugin = {
  name: 'users',
  version: '1.0.0',
  register: (server, { service, validator }) => {
    const usersHandler = new UsersHandler(service, validator);
    const routes = userRoutes(usersHandler);
    server.route(routes);
  },
};

module.exports = { usersPlugin };
