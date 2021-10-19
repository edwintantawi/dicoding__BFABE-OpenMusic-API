const Jwt = require('@hapi/jwt');
const { JWT_CONFIG } = require('../config');
const { InvariantError } = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) => {
    const token = Jwt.token.generate(payload, JWT_CONFIG.ACCESS_TOKEN_KEY);
    return token;
  },

  generateRefreshToken: (payload) => {
    const token = Jwt.token.generate(payload, JWT_CONFIG.REFRESH_TOKEN_KEY);
    return token;
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, JWT_CONFIG.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Invalid refresh token');
    }
  },
};

module.exports = { TokenManager };
