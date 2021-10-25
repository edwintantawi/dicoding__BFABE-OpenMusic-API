class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler({ payload }, h) {
    this._validator.validateUserPayload(payload);
    const { username, password, fullname } = payload;

    const userId = await this._service.addUser({
      username,
      password,
      fullname,
    });

    const response = h.response({
      status: 'success',
      message: 'User added successfully',
      data: { userId },
    });
    response.code(201);
    return response;
  }
}

module.exports = { UsersHandler };
