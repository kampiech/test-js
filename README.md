# junoJs

[![Build Status](https://gppracuj.visualstudio.com/Relax/_apis/build/status/junoJs/Publish?branchName=dev)](https://gppracuj.visualstudio.com/Relax/_build/latest?definitionId=129&branchName=dev)

> NodeJS libraries used in our applications.

## Features

* Support both data centers - on premises, aks - and isolate differences between them
* Service discovery - register in service catalog and get service state/address
* Support for graceful shutdown and k8s specific liveness, readiness, startup probes
* Service metrics (prometheus) - http service state, garbage collector, node.js state etc.
* Support for logs - file/json format, http logger out of the boxm pretty print for console etc.
* App configuration - config validation, custom settings, fully support staging etc.
* Cli for app scaffolding

## Quickstart

[Quickstart](./docs/QUICKSTART.md)

## Packages

Packages:
- [juno-auth](./packages/juno-auth/README.md)
- [juno-cli](./packages/juno-cli/README.md)
- [juno-config](./packages/juno-config/README.md)
- [juno-discovery](./packages/juno-discovery/README.md)
- [juno-express](./packages/juno-express/README.md)
- [juno-logger](./packages/juno-logger/README.md)
- [juno-metrics](./packages/juno-metrics/README.md)
- [business-variables](packages/business-variables/README.md)
- [client-credentials](packages/client-credentials/README.md) (deprecated)
- [consul](packages/consul/README.md)
- [credentials](packages/credentials/README.md)
- [logger](packages/logger/README.md) (deprecated)
- [metrics](packages/metrics/README.md) (deprecated)

## Requirements

- NodeJS v18.x
- pnpm

## Development

Install it:

1. `git clone https://github.com/GrupaPracuj/junoJs.git`
2. `cd junoJS`
3. `pnpm i --ignore-scripts`

## Releasing from feature-branch (prerelease):

Just make PR with your changes. Prerelease pipeline should automatically publish it and the result commit to your branch.

## Releasing:

Merge PR to master, after successful task ADO should commit new version to master.

## Links

- [Styleguide](./docs/STYLEGUIDE.md)
- [Sonar](https://sonar2.pracuj.pl/dashboard?id=junoJs)
- [Pipelines on ADO](https://gppracuj.visualstudio.com/Architekci/_build?definitionScope=%5CjunoJs)

