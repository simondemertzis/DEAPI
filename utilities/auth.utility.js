const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

module.exports.checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://omnomnom.auth0.com/.well-known/jwks.json'
    }),
    // Validate the audience and the issuer.
    audience: 'https://omnomnom.auth0.com/api/v2/',
    issuer: 'https://omnomnom.auth0.com/',
    algorithms: ['RS256']
});