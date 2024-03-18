const transformSuccessBody = (res, body = {}) => {
  const message = body?.message;
  Reflect.deleteProperty(body, 'message');

  const transformedBody = {
    status: res.statusCode,
    success: true,
    message,
    requestTime: new Date().getTime(),
    data: body?.data ?? body,
  };

  return transformedBody;
};

const transformErrorBody = (res, body) => {
  const { status, message, error } = body;

  const transformedBody = {
    status,
    success: false,
    message,
    error,
    requestTime: new Date().getTime(),
    data: {},
  };

  return transformedBody;
};

const appendSuccess = (req, res, next) => {
  res.success = res.json;
  const old = res.success.bind(res);
  res.success = (body) => old(transformSuccessBody(res, body));
  next();
};

const appendError = (req, res, next) => {
  res.error = res.json;
  const old = res.error.bind(res);
  res.error = (body) => old(transformErrorBody(res, body));
  next();
};

export const appendExpressResponseProperty = {
  /**
   * Introducing new Property of response called `success`
   * it is similar to `res.json` just added some function
   * to enhance response body
   *
   * @example
   *
   * ```js
   *   res.success({name: "akash"});
   *   res.success({name: "akash"}).status(200);
   * ```
   *
   * @param {*} req  Request
   * @param {*} res  Response
   * @param {*} next  Next
   *
   * @returns {void} Middleware
   */
  appendSuccess,

  /**
   * Introducing new Property of response called `error`
   * it is similar to `res.json` just added some function
   * to enhance response body
   *
   * @example
   *
   * ```js
   *   res.error({name: "akash"});
   *   res.error({name: "akash"}).status(400);
   * ```
   * @param {*} req  Request
   * @param {*} res  Response
   * @param {*} next  Next
   *
   * @returns {void} Middleware
   */
  appendError,
};
