# Quickstart

## Prerequisites

If it's your first time please ensure you have properly configured access to our [packages repository](https://learn.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops&tabs=windows%2Cclassic)

Set the global prefix for our packages
```
npm config set @grupa-pracuj:registry https://gppracuj.pkgs.visualstudio.com/_packaging/gp/npm/registry/
```

Optionally, for a better experience, run consul locally e.g. using example [docker-compose](./examples/next/docker-compose.yaml)

## Create an app

Create a new app using `next.js` with plain `js` and `pnpm` package manager
```
pnpm create next-app
```

Enter app directory
```
cd YOUR-APP
```

Firstly, create a new juno-js config using [juno-cli](./packages/juno-cli/README.md)
```
npx @grupa-pracuj/juno-cli create-app-config
```
or using pnpm alternative
```
pnpm --package=@grupa-pracuj/juno-cli dlx juno-cli create-app-config
```

secondly, create a new juno-js app server
```
npx @grupa-pracuj/juno-cli create-app
```
or using pnpm alternative
```
pnpm --package=@grupa-pracuj/juno-cli dlx juno-cli create-app
```

Then, build `next.js` app
```
pnpm run build
```

and finally, run the server.
```
node server/index.js
```

After a few seconds, your app should be running, already registered in the service catalog, and ready for development.

Go to `http://localhost:3000/juno` you should get something similar to
```json
{"project":"YOUR-APP","version":"5.8.28"}
```
