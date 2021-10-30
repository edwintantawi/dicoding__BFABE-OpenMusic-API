/* eslint-disable class-methods-use-this */
const { ClientError } = require('../../exceptions/ClientError');

class ExtensionsHandler {
  onPreResponseHandler(request, h) {
    const { response } = request;
    const hapiErrorPayload = response?.output?.payload;

    // client error or hapi error
    if (response instanceof ClientError || hapiErrorPayload) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message || hapiErrorPayload?.message,
      });
      newResponse.code(response.statusCode || hapiErrorPayload?.statusCode);
      return newResponse;
    }

    // server error
    if (response instanceof Error) {
      const newResponse = h.response({
        status: 'error',
        message: 'Server error',
      });
      newResponse.code(500);
      return newResponse;
    }

    return response.continue || response;
  }
}

module.exports = { ExtensionsHandler };
