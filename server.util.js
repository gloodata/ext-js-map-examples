export function replyJSON(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function opNotFoundError(opName) {
  return {
    ok: false,
    code: "OpNameNotFound",
    reason: "Operation not Found",
    info: { opName },
  };
}

export function makeHandler({ getInfo, handleRequest }) {
  return async function handler(req) {
    const url = new URL(req.url);
    console.log(req.method, url.pathname);

    if (req.method !== "POST") {
      return replyJSON({ error: "Invalid method" }, 405);
    }

    const body = await req.json(),
      action = body?.action;

    if (action === "info") {
      const infoBody = await getInfo();
      return replyJSON(infoBody, 200);
    } else if (action === "request") {
      const handlerBody = await handleRequest(body);
      if (handlerBody == null) {
        return opNotFoundError(body?.opName ?? null);
      } else {
        return replyJSON(handlerBody, 200);
      }
    }

    return replyJSON({ error: "Not Found" }, 404);
  };
}
