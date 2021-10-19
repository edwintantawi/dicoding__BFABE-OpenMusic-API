const {
  postAuthenticationPayloadSchema,
  refreshTokenAuthenticationPayloadSchema,
} = require('./schema');
const { InvariantError } = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = postAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateRefreshTokenAuthenticationPayload: (payload) => {
    const validationResult =
      refreshTokenAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = { AuthenticationsValidator };
