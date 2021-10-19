const Joi = require('joi');

const postAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const refreshTokenAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  postAuthenticationPayloadSchema,
  refreshTokenAuthenticationPayloadSchema,
};
