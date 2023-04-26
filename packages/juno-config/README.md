
# juno-config

The primary use case for such solution is to provide unified standard for frontend apps configuration and to limit the need of modifying an application due to the changes in our tools, standards and environments etc.

Please, note that `juno-config` is built on the top of [app-config library](https://app-config.dev) and provide us with some tricks and convention around.

## How it works

All config settings are stored inside `.app-config.*.yaml` files. Those files are loaded from `.juno/` folder in specific order, using overloading strategy.

If environment variable `APP_CONFIG_ENV` is presented then app will load `.juno/.app-config` file with specified suffix.

To be more detailed:
* load `./juno./.app-config.#{APP_CONFIG_ENV}#.yaml` as first
* `.app-config.#{APP_CONFIG_ENV}#.yaml` extend `.app-config.deployment.yaml`
* `.app-config.deployment.yaml` extend `.app-config.juno.yaml`
* and finally `.app-config.juno.yaml` extend `.app-config.yaml`

Example:
* If `APP_CONFIG_ENV=test123` then juno will load config: `.juno/.app-config.test123.yaml` and all configs that this file extends
* If `APP_CONFIG_ENV` is not present, then by default juno will load config `.app-config.yaml` and all configs that this file extends

Please note, `.app-config.yaml` is on the top, is loaded always, regardless of `APP_CONFIG_ENV` value.

Some kind of data are stored outside the app and should be loaded from environment variables, e.g. using CI - Azure DevOps, Key Vault etc. To do that you should use parsing extension [$envVar](https://app-config.dev/guide/intro/extensions.html#the-env-directive).

## Config validation

All config settings are validated using json schema. Schema is presented inside `.juno/.app-config.schema.yaml` and `.juno/.app-config.schema.juno.yaml`.

## Getting started (custom app settings)

You can provide your own settings, e.g. app specific, using juno-config.

To do that add your app specific section inside `.juno/.app-config.yaml`
```yaml
$extends: ./.app-config.juno.yaml

app:
  GTMContainerId: 'app-container'

juno:
  project:
    name: "junojs-example"
```

and then add schema validation definition to `.juno/.app-config.schema.yaml`.
```yaml
type: object
additionalProperties: true
required:
  - juno
  - app
properties:
  app:
    type: object
    additionalProperties: false
    required: [ GTMContainerId ]
    properties:
      name:
        GTMContainerId: string

  juno:
    $ref: '.app-config.schema.juno.yaml'
```

Finally, your settings should be available inside config object
```js
const config  = useConfig();
const { GTMContainerId } = config.app;
```

## Deployment settings

For release stage you should use environment variable `APP_CONFIG_ENV`.

Currently supported options are:
* `deployment.atm` - dedicated to ATM on premise
* `deployment.k8s` - dedicated to Azure k8s runtime

In both cases you will have to provide few environments variable:
* JUNO_SERVER_PORT - used to bind and listen to the connections on specific port
* JUNO_CLIENT_ID - client id for client credentials authorization flow
* JUNO_CLIENT_SECRET - client secret for client credentials authorization flow
* JUNO_TOKEN_HOST - token host for client credentials authorization flow
* JUNO_SERVICE_HOST - used to service discovery, e.g. podIP on AKS
* JUNO_SERVICE_PORT - used to service discovery, usally same as JUNO_SERVER_PORT
* JUNO_CONSUL_HOST - service catalog (consul) host
* JUNO_CONSUL_PORT - service catalog (consul) listening port

Keep in mind:
* OAuth client credentials flow is used to exchange a pair of client credentials (JUNO_CLIENT_ID, JUNO_CLIENT_SECRET) for an access token (see [example](/examples/next/server/with-api.mjs))
* Service discovery port setting (JUNO_SERVICE_PORT) and runtime server port setting are usually the same
