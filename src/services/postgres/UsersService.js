const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { InvariantError } = require('../../exceptions/InvariantError');
const { AuthenticationError } = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const securePassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, securePassword, fullname],
    };

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

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const user = await this._pool.query(query);

    if (!user.rowCount) {
      throw new AuthenticationError(
        'The credentials you provided are wrong, user not found'
      );
    }

    const { id, password: securePassword } = user.rows[0];

    const isMatchPassword = await bcrypt.compare(password, securePassword);

    if (!isMatchPassword) {
      throw new AuthenticationError(
        "The credentials you provided are wrong, password don't match"
      );
    }

    return id;
  }
}

module.exports = { UsersService };
