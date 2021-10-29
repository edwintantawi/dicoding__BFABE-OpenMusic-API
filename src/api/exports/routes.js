const exportsRoutes = (handler, { auth }) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportPlaylistSongsHandler,
    options: { auth },
  },
];

module.exports = { exportsRoutes };
