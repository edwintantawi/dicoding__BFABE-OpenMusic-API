require('dotenv').config();

const SERVER_CONFIG = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};

const JWT_CONFIG = {
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
};

module.exports = { SERVER_CONFIG, JWT_CONFIG };
