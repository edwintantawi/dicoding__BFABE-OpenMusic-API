const { UploadsHandler } = require('./handler');
const { uploadRoutes } = require('./routes');

const uploadsPlugin = {
  name: 'uploads',
  version: '1.0.0',
  register: (server, { service, validator }) => {
    const uploadsHandler = new UploadsHandler(service, validator);
    const routes = uploadRoutes(uploadsHandler);
    server.route(routes);
  },
};

module.exports = { uploadsPlugin };
