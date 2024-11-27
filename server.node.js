/* globals process */
import http from "http";
import { getInfo, handleRequest } from "./extension.js";

function replyJSON(response, data, status = 200) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
}

function opNotFoundError(opName) {
  return {
    ok: false,
    code: "OpNameNotFound",
    reason: "Operation not Found",
    info: { opName },
  };
}

async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(req.method, url.pathname);

  if (req.method !== "POST") {
    return replyJSON(res, { error: "Invalid method" }, 405);
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    body = JSON.parse(body);
    const action = body?.action;

    if (action === "info") {
      const infoBody = await getInfo();
      return replyJSON(res, infoBody);
    } else if (action === "request") {
      const handlerBody = await handleRequest(body);
      if (handlerBody == null) {
        return replyJSON(res, opNotFoundError(body?.opName ?? null));
      } else {
        return replyJSON(res, handlerBody);
      }
    }

    return replyJSON(res, { error: "Not Found" }, 404);
  });
}

function main() {
  const hostname = process.env.HOSTNAME || "localhost";
  const port = parseInt(process.env.PORT, 10) || 3000;

  http.createServer(handler).listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}/`);
  });
}

main();
