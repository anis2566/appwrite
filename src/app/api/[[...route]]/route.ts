import { Hono } from "hono";
import { handle } from "hono/vercel";

import authApp from "@/features/auth/server/route";
import locationApp from "@/features/location/server/route";

export const runtime = "edge";

const app = new Hono().basePath("/api").route("/auth", authApp).route("/location", locationApp);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
