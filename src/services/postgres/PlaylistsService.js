const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { InvariantError } = require('../../exceptions/InvariantError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist(playlistName, ownerId) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistName, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) throw new InvariantError('Playlist failed to add');

    return result.rows[0].id;
  }
}

module.exports = { PlaylistsService };
