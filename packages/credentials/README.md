# `credentials`

> Validate jwks token middleware. For gp token it also transform token to camelCase.

## Usage

```javascript
const { jwt, transformJWT } = require('credentials');

app
  .use(jwt({
    getToken,
    jwksUri,
    algorithms: ['RS256']
  }))
  .use(transformJWT);
```

- getToken - function which returns token as a string,
- jwksUri - validation url,
- algorithms - encryption algorithms ex. RS256.

## Development

For running tests/eslint go to root `package.json` of junoJs.

## Links
* [Styleguide](../../docs/STYLEGUIDE.md)
* [Sonar](https://SONar.pracuj.pl/dashboard?id=JunoJs)
* [Pull Request pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=175&_a=summary)
* [Sonar pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=176&_a=summary)
* [Publish pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=129&_a=summary)
* [Code coverage and eslint report](https://gppracuj.visualstudio.com/Relax/_test/analytics?definitionId=175&contextType=build)
