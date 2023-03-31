import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

const mongoURI: string = process.env.MONGO_URI || "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const options: MongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const client: MongoClient = new MongoClient(mongoURI, options);

export default client;
