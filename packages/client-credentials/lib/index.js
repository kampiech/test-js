const oauth2 = require("simple-oauth2");

const makeTokenAssignment = (request, response) => (token) => {
  response.locals.token = token;
  request.clientCredentials = { token };
};

const clientCredentials = async ({ client, auth, scope }) => {
  const authorization = oauth2.create({
    client,
    auth: {
      ...auth,
      tokenPath: auth.tokenPath || "/connect/token",
      revokePath: auth.tokenPath || "/connect/revoke",
    },
  });
  const createToken = (data) => authorization.accessToken.create(data);
  const [result, resultError] = await authorization.clientCredentials
    .getToken({ scope })
    .then((response) => [response])
    .catch((error) => [null, error]);

  if (resultError) {
    throw resultError;
  }
  let accessToken = createToken(result);
  return (request, response, next) => {
    const setToken = makeTokenAssignment(request, response);

    if (!accessToken.expired()) {
      setToken(accessToken.token);
      return next();
    }
    return authorization.clientCredentials
      .getToken({ scope })
      .then((newResult) => createToken(newResult))
      .then((newAccessToken) => {
        accessToken = newAccessToken;
        setToken(accessToken.token);
        return next();
      })
      .catch((error) => next(error));
  };
};

module.exports = clientCredentials;
