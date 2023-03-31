import express, { Express, Request, Response } from "express";

const app: Express = express();
const { v4 } = require("uuid");

/* GET ENDPOINTS */
app.get("/api", (req: Request, res: Response) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

/* POST ENDPOINTS */
app.post("/api", (req: Request, res: Response) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    key: process.env.API_KEY,
    method: req.method,
  });
});

app.post("/api/people/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    key: process.env.API_KEY,
    message: `Hello from the API, ${name}`,
    method: req.method,
  });
});

module.exports = app;
