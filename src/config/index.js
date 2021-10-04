require('dotenv').config();

const SERVER_CONFIG = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  ORIGIN: process.env.ORIGIN,
};

module.exports = { SERVER_CONFIG };
