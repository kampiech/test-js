# juno-cli

Juno-cli is a small tool to scaffold GP frontend apps. It gives as a simple way to generate code or any other type of flat text files (e.q. config files) in a consistent way.

You can easily provide data using command line args or giving answers for cli prompts.

## Prerequisites

If it's your first time please ensure you have properly configured access to our [packages repository](https://learn.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops&tabs=windows%2Cclassic)

Next, set global prefix for our packages
```
npm config set @grupa-pracuj:registry https://gppracuj.pkgs.visualstudio.com/_packaging/gp/npm/registry/
```

## Usage

To run juno-cli, just type
```
npx @grupa-pracuj/juno-cli
```

Currently, supported methods:

`Create app config`
```
npx @grupa-pracuj/juno-cli create-app-config
```
Parameters:
* `name` - app name, used e.g. in service discovery, logs
* `team` - team name, used e.g. in service discovery

`Create app`
```
npx @grupa-pracuj/juno-cli create-app
```
Parameters:
* `app-type` - choose app template for next.js or nodejs http service
* `add-deps` - (default: true) add dependencies to package.json
* `install-deps` - (default: false) run install dependencies command, usually skipped if it's monorepo
* `package-manager` - (default: npm_config_user_agent) decide which package manager would be used: npm, pnpm, yarn


# CI/CD

You can run `juno-cli` easily inside your CI/CD pipeline by passing paramters as arguments, e.g.

```
npx @grupa-pracuj/juno-cli create-app --app-type=nextjs --add-deps=true --install-deps=true --package-manager=pnpm
```

## Troubleshooting

### My juno-cli is out of date

Please run `npx clear-npx-cache` before running juno-cli.
