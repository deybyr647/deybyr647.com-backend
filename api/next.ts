import type { VercelRequest, VercelResponse } from "@vercel/node";
import client from "../util/mongo-config";

/* Vercel/Next.js API Route */
const handler = async (req: VercelRequest, res: VercelResponse) => {
  // Connect to the MongoDB database
  await client.connect();

  // Get the database
  const db = client.db("deybyr647-portfolio");

  // Get the collection
  const projects = db.collection("projects");

  // Get all the documents
  const documents = await projects.find().toArray();

  // Close the connection
  await client.close();


  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    key: process.env.API_KEY,
    message: "Hello from the API!",
    method: req.method,
    projects: documents,
  });
};

export default handler;
