const { SERVER_CONFIG } = require('../../config');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadPictureHandler = this.postUploadPictureHandler.bind(this);
  }

  async postUploadPictureHandler({ payload }, h) {
    const { data } = payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    const filename = await this._service.writeFile(data, data.hapi);
    const fileLocation = `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/upload/pictures/${filename}`;

    const response = h.response({
      status: 'success',
      data: { fileLocation },
    });
    response.code(201);
    return response;
  }
}

module.exports = { UploadsHandler };
