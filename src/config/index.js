require('dotenv').config();

const SERVER_CONFIG = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};

module.exports = { SERVER_CONFIG };
