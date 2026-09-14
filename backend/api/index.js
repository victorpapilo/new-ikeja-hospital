// Vercel entry point. Vercel treats any function exported here as a
// serverless function — passing it the Express app directly works because
// Express apps are already (req, res) => {} compatible.
import app from "../app.js";
import connectDB from "../config/db.js";

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
