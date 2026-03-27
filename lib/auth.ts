import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";

import { getMongoDb, mongoClientPromise } from "@/lib/mongo-client";

const db = await getMongoDb();
const client = await mongoClientPromise;

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "trustpay-dev-secret-change-this-in-production-32chars",
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"],
  plugins: [nextCookies()],
});
