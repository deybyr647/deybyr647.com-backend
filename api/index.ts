import express, { Express, Request, Response } from "express";
import { v4 } from "uuid";

import client from "../util/mongo-config";

const app = express();

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

app.get("/api/projects/:project", async (req: Request, res: Response) => {
  const { project } = req.params;

  // Connect to the MongoDB database
  await client.connect();

  // Get the database
  const db = client.db("deybyr647-portfolio");

  // Get the collection
  const projects = db.collection("projects");

  // Get document where the project name is equal to the project parameter
  let result = await projects.findOne({ name: project });

  await client.close();

  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    key: process.env.API_KEY,
    message: "Here's the project you requested!",
    method: req.method,
    queriedProject: result,
  });
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
