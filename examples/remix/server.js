const path = require("path");
const { createRequestHandler } = require("@remix-run/express");

const BUILD_DIR = path.join(process.cwd(), "build");

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== "production";

(async () => {
  const { loadConfig } = await import("@grupa-pracuj/juno-config");
  const { createServer } = await import("@grupa-pracuj/juno-express");
  const { useLogger } = await import("@grupa-pracuj/juno-logger");

  await loadConfig();

  const logger = useLogger();

  try {
    const server = await createServer({
      isDev,
    });

    server.all(
      "*",
      process.env.NODE_ENV === "development"
        ? (req, res, next) => {
            purgeRequireCache();

            return createRequestHandler({
              build: require(BUILD_DIR),
              mode: process.env.NODE_ENV,
            })(req, res, next);
          }
        : createRequestHandler({
            build: require(BUILD_DIR),
            mode: process.env.NODE_ENV,
          })
    );
  } catch (error) {
    logger.error("Server has failed", { error });
    process.exit(1);
  }
})();

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
