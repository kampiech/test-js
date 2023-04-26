const jwksRSA = require('jwks-rsa');
const { expressjwt: jwt } = require('express-jwt');

const transformJWTDataMiddleware = (request, _, next) => {
  const { user } = request;

  if (!user) {
    next();
    return;
  }

  const id = user.sub.split(':')[1];
  request.user = {
    userId: id ? Number(id) : null,
    email: user.email,
    givenName: user.given_name,
    familyName: user.family_name,
    emailVerified: user.email_verified === 'True',
    isConfirmed: user.IsConfirmed === 'True'
  };

  next();
};

const msInHour = 3600000000;
const defaultCacheMaxAge = 4 * msInHour;

const createJWTMiddleware = ({
  algorithms,
  getToken,
  jwksUri,
  cacheMaxAge = defaultCacheMaxAge
}) => {
  const jwksConfig = {
    jwksUri,
    cacheMaxAge,
    cache: true,
    rateLimit: true,
    strictSsl: false
  };

  return jwt({
    algorithms,
    getToken,
    requestProperty: 'user',
    secret: jwksRSA.expressJwtSecret(jwksConfig),
    credentialsRequired: false
  });
};

/*
 *jwksUri is url linked to your open-id server, ex: https://YOUR_OPEN_ID_SERVER/.well-known/jwks
 *
 */
module.exports = {
  jwt: createJWTMiddleware,
  transformJWT: transformJWTDataMiddleware
};
