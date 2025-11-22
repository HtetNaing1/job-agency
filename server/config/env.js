import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, REFRESH_SECRET } = process.env;

// Export as config object for convenience
export const config = {
  port: PORT,
  nodeEnv: NODE_ENV,
  dbUri: DB_URI,
  jwtSecret: JWT_SECRET,
  refreshSecret: REFRESH_SECRET,
};
