# `@grupa-pracuj/client-credentials`

> Get credentials from openid connect server.

## Usage

`npm i @grupa-pracuj/client-credentials`

Correctly implemented - will add to `res.locals` object `token`:
```json
{
	"access_token": "access_token",
	"expires_in": 3600,
	"token_type": "Bearer",
	"expires_at": "2019-04-23T07:55:27.069Z"
}
```

`res.locals.token` **should be used only for handling requests as unauthorized user**(without cookie).

```javascript
const clientCredentials = require('@grupa-pracuj/client-credentials');

const connectToIdentityServer = () => select(API.ACCOUNTS)
  .then(({ Address }) => `http://${Address}`)
  .then(tokenHost => clientCredentials({
    scope: 'application',
    client: {
      id: CLIENT_ID,
      secret: CLIENT_SECRET
    },
    auth: {
      tokenHost
    }
  }));
  
const [requestHandler, clientCredentialsError] = await connectToIdentityServer()
  .then(response => [response])
  .catch(error => [null, error]);
  
if (clientCredentialsError) {
  appLogger.error(clientCredentialsError);
  throw clientCredentialsError;
}

app.use(requestHandler);
```

## Development

For running tests/eslint go to root `package.json` of junoJs.


## Links
* [Styleguide](../../docs/STYLEGUIDE.md)
* [Sonar](https://SONar.pracuj.pl/dashboard?id=JunoJs)
* [Pull Request pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=175&_a=summary)
* [Sonar pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=176&_a=summary)
* [Publish pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=129&_a=summary)
* [Code coverage and eslint report](https://gppracuj.visualstudio.com/Relax/_test/analytics?definitionId=175&contextType=build)
