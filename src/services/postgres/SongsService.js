const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { InvariantError } = require('../../exceptions/InvariantError');
const { NotFoundError } = require('../../exceptions/NotFoundError');
const { mapSongTableToModel } = require('../../utils');

class SongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addSong({ title, year, performer, genre, duration }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO songs
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING id`,
      values: [id, title, year, performer, genre, duration],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) throw new InvariantError('Song failed to add');

    return rows[0].id;
  }

  async getSongs() {
    const query = `SELECT id, title, performer
                    FROM songs`;

    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getSongById(id) {
    const query = {
      text: `SELECT *
              FROM songs
              WHERE id = $1`,
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Song with that id not found');
    }

    return rows.map(mapSongTableToModel)[0];
  }

  async getSongsByPlaylistId(playlistId) {
    try {
      const result = await this._cacheService.get(
        `playlist-songs:${playlistId}`
      );
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: `SELECT songs.id, songs.title, songs.performer
              FROM songs
              LEFT JOIN playlistsongs
              ON playlistsongs.song_id = songs.id
              WHERE playlistsongs.playlist_id = $1`,
        values: [playlistId],
      };

      const { rows } = await this._pool.query(query);

      await this._cacheService.set(
        `playlist-songs:${playlistId}`,
        JSON.stringify(rows)
      );

      return rows;
    }
  }

  async editSongById(id, { title, year, performer, genre, duration }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE songs
              SET title = $1,
                year = $2,
                performer = $3,
                genre = $4,
                duration = $5,
                updated_at = $6
              WHERE id = $7
              RETURNING id`,
      values: [title, year, performer, genre, duration, updatedAt, id],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Fail to update, Song with that id not found');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: `DELETE FROM songs
              WHERE id = $1
              RETURNING id`,
      values: [id],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Fail to delete, Song with that id not found');
    }
  }
}

module.exports = { SongsService };
