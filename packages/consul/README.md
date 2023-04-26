# `@grupa-pracuj/consul`

> Simple wrapper of `node-consul` to register service or select service from consul.

## Usage

```javascript
const consul = require('consul');

const { register, select } = consul();

(async () => {
  await register({ address: '', port: 0, name: '' });
  
  await select('');
});
```

## Select

Wrapper of [consul.health.service](https://github.com/silas/node-consul#consulhealthserviceoptions-callback).

Motivation to create it: Possibility to create different strategies of selecting.

`select(name, strategy = Random)`

* name - name of alive service
* strategy - by default `consul.health.service` returns array of services. We want to pick one using passed "algorithm".

Returns promise with single service: 

```json
  {
    "Node": {
      "Node": "node1",
      "Address": "127.0.0.1"
    },
    "Service": {
      "ID": "example",
      "Service": "example",
      "Tags": [],
      "Port": 0
    },
    "Checks": [
      {
        "Node": "node1",
        "CheckID": "service:example",
        "Name": "Service 'example' check",
        "Status": "critical",
        "Notes": "",
        "Output": "",
        "ServiceID": "example",
        "ServiceName": "example"
      },
      {
        "Node": "node1",
        "CheckID": "serfHealth",
        "Name": "Serf Health Status",
        "Status": "passing",
        "Notes": "",
        "Output": "Agent alive and reachable",
        "ServiceID": "",
        "ServiceName": ""
      }
    ]
  }
```

## Register

It registers service and additionally it set tcp healthcheck with 5s interval.

Wrapper of [consul.agent.service](https://github.com/silas/node-consul#consulagentserviceregisteroptions-callback) and [consul.agent.check.register](https://github.com/silas/node-consul#consulagentcheckregisteroptions-callback)

`register({ name, address, port, ...rest })`

- rest params are defined in [consul.agent.service](https://github.com/silas/node-consul#consulagentserviceregisteroptions-callback)

## Development

For running tests/eslint go to root `package.json` of junoJs.

## Links
* [Styleguide](../../docs/STYLEGUIDE.md)
* [Sonar](https://SONar.pracuj.pl/dashboard?id=JunoJs)
* [Pull Request pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=175&_a=summary)
* [Sonar pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=176&_a=summary)
* [Publish pipeline](https://gppracuj.visualstudio.com/Relax/_build?definitionId=129&_a=summary)
* [Code coverage and eslint report](https://gppracuj.visualstudio.com/Relax/_test/analytics?definitionId=175&contextType=build)
