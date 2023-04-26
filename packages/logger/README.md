# `@grupa-pracuj/logger`

> Error handler and logger.

## Usage

### ErrorHandler
```javascript
const { errorHandler, appLogger } = require('logger')({ loggerName, logsPath });

app
  .use(routes)
  .use(someMiddlewares)
  .use(errorHandler)
```

Add errorHandler as **last** middleware in your application.

### appLogger
Similar to `console`

## Development

For running tests/eslint go to root `package.json` of junoJs.

## Links
* [Styleguide](../../docs/STYLEGUIDE.md)
* [Sonar](https://SONar.pracuj.pl/dashboard?id=JunoJs)
* [Pull Request pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=175&_a=summary)
* [Sonar pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=176&_a=summary)
* [Publish pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=129&_a=summary)
* [Code coverage and eslint report](https://gppracuj.visualstudio.com/Relax/_test/analytics?definitionId=175&contextType=build)
