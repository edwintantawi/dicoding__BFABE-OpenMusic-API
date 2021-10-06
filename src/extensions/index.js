const { ClinetError } = require('../exceptions/ClientError');

class Extensions {
  static onPreResponse(request, h) {
    const { response } = request;

    // client error
    if (response instanceof ClinetError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // server error
    return response.continue || response;
  }
}

module.exports = { Extensions };
