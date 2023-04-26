const { createServer } = require("http");
const logger = require("../lib/logger");

const { appLogger } = logger({
  logsPath: "./logs",
});

const server = createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(404);

    return res.end();
  }

  appLogger.info("hello");

  res.end("hello");
});

server.listen(80);
