const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { InvariantError } = require('../../exceptions/InvariantError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong(songId, playlistId) {
    const id = `playlist_song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlistsongs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Song playlist failed to add');
    }
  }
}

module.exports = { PlaylistSongsService };
