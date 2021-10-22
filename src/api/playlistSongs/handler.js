class PlaylistSongsHandler {
  constructor({
    playlistSongsService,
    playlistsService,
    songsService,
    validator,
  }) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongHandler = this.deletePlaylistSongHandler.bind(this);
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { songId } = request.payload;
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.addPlaylistSong(songId, playlistId);
    const response = h.response({
      status: 'success',
      message: 'The song has been successfully added to the playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const songs = await this._songsService.getSongsByPlaylist(playlistId);

    return {
      status: 'success',
      data: { songs },
    };
  }

  async deletePlaylistSongHandler(request) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.getPlaylistSongById(playlistId, songId);
    await this._playlistSongsService.deletePlaylistSongById(playlistId, songId);

    return {
      status: 'success',
      message: 'The song has been successfully removed from the playlist',
    };
  }
}

module.exports = { PlaylistSongsHandler };
