/* globals Deno */
import { getInfo, handleRequest } from "./extension.js";
import { makeHandler } from "./server.util.js";

function main() {
  const hostname = Deno.env.get("HOSTNAME") ?? "localhost",
    port0 = parseInt(Deno.env.get("PORT") ?? "3000", 10),
    port = isNaN(port0) || port0 < 0 || port0 > 65535 ? 3000 : port0,
    handler = makeHandler({ getInfo, handleRequest });

  console.log(`Server started at http://${hostname}:${port}/`);
  Deno.serve({ port, hostname, onListen(_path) {} }, handler);
}

main();
