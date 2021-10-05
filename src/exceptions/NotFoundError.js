const { ClinetError } = require('./ClientError');

class NotFoundError extends ClinetError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = { NotFoundError };
