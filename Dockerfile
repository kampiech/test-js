FROM acreuwglobal.azurecr.io/base/node-base:18-alpine as base

WORKDIR     /opt/app

FROM base as dev
ARG ProjectPath

COPY  ./examples ./examples
COPY  ./packages ./packages
COPY  ./pnpm-*.yaml .
COPY  ./package.json .
COPY  ./.npmrc .

COPY .npmrcagent ./
RUN cat .npmrcagent >> .npmrc

RUN cat .npmrc
RUN ls -lia /opt/app

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store
RUN pnpm i --prod --ignore-scripts

EXPOSE 80
