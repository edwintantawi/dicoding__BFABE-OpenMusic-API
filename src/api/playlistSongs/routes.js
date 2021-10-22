const playlistSongRoutes = (handler, { auth }) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongHandler,
    options: { auth },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: { auth },
  },
];

module.exports = { playlistSongRoutes };
