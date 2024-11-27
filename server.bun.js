/* globals Bun, process */
import { getInfo, handleRequest } from "./extension.js";
import { makeHandler } from "./server.util.js";

function main() {
  const hostname = process.env.HOSTNAME ?? "localhost",
    port0 = parseInt(process.env.PORT ?? "3000", 10),
    port = isNaN(port0) || port0 < 0 || port0 > 65535 ? 3000 : port0,
    handler = makeHandler({ getInfo, handleRequest });

  console.log(`Server started at http://${hostname}:${port}`);
  Bun.serve({ hostname, port, fetch: handler });
}

main();
