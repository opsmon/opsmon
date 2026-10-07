import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve("dist");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let path = decodeURIComponent(url.pathname),
    status = 200,
    body;
  let relative = path.startsWith("/opsmon/") ? path.slice(8) : "";
  if (!relative) relative = path === "/opsmon/" ? "index.html" : "404.html";
  let file = resolve(root, relative);
  try {
    if (!file.startsWith(root + "/")) throw Error();
    body = await readFile(file);
    if (relative === "404.html") status = 404;
  } catch {
    file = resolve(root, "404.html");
    body = await readFile(file);
    status = 404;
  }
  res.writeHead(status, {
    "Content-Type": types[extname(file)] || "application/octet-stream",
  });
  res.end(body);
}).listen(4173, "127.0.0.1");
