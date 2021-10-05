const songRoutes = (handler) => [
  {
    path: '/songs',
    method: 'POST',
    handler: handler.postSongHandler,
  },
  {
    path: '/songs',
    method: 'GET',
    handler: () => {},
  },
  {
    path: '/songs/{id}',
    method: 'GET',
    handler: () => {},
  },
  {
    path: '/songs/{id}',
    method: 'PUT',
    handler: () => {},
  },
  {
    path: '/songs/{id}',
    method: 'DELETE',
    handler: () => {},
  },
];

module.exports = { songRoutes };
