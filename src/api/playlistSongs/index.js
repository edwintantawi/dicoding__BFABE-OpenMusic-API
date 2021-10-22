const { JWT_CONFIG } = require('../../config');
const { PlaylistSongsHandler } = require('./handler');
const { playlistSongRoutes } = require('./routes');

const playlistSongsPlugin = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: (
    server,
    { playlistSongsService, playlistsService, songsService, validator }
  ) => {
    const playlistSongsHandler = new PlaylistSongsHandler({
      playlistSongsService,
      playlistsService,
      songsService,
      validator,
    });
    const routes = playlistSongRoutes(playlistSongsHandler, {
      auth: JWT_CONFIG.AUTH_STRATEGY_NAME,
    });
    server.route(routes);
  },
};

module.exports = { playlistSongsPlugin };
