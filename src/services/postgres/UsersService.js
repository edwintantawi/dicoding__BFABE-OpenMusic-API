const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { InvariantError } = require('../../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    const id = `user-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, password, fullname],
    };

    await this.verifyNewUsername(username);
    const result = await this._pool.query(query);

    if (!result.rows[0].id) throw new InvariantError('User failed to add');

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Fail to add user, Username is already exist');
    }
  }
}

module.exports = { UsersService };
