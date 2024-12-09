import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";

import { SignInSchema, SignUpSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { AUTH_COOKIE_NAME } from "@/constant";
import { sessionMiddleware } from "@/lib/session-middleware";
import { config } from "@/lib/appwrite.config";

const app = new Hono()
  .post("/login", zValidator("json", SignInSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    // INITIALIZE ADMIN CLIENT
    const { account, database } = await createAdminClient();

    // CHECK IF USER EXISTS
    const user = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("email", email)]
    );

    if (user.documents.length === 0) {
      return c.json({ error: "Invalid credentials" }, 400);
    }

    // CHECK IF PASSWORD IS CORRECT
    if (user.documents[0].password !== password) {
      return c.json({ error: "Invalid credentials" }, 400);
    }

    // CREATE SESSION
    const session = await account.createEmailPasswordSession(email, password);

    // SET COOKIE
    setCookie(c, AUTH_COOKIE_NAME, session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return c.json({ success: "Login successful" });
  })
  .post("/register", zValidator("json", SignUpSchema), async (c) => {
    const { email, password, name } = c.req.valid("json");

    // INITIALIZE ADMIN CLIENT
    const { account, database } = await createAdminClient();

    // CHECK IF USER EXISTS
    const existingUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("email", email)]
    );

    if (existingUser.documents.length > 0) {
      return c.json({ error: "User already exists" }, 400);
    }

    // CREATE USER ACCOUNT
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // CREATE USER DOCUMENT
    await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      { email, password, name, accountId: userAccount.$id }
    );

    // CREATE SESSION
    const session = await account.createEmailPasswordSession(email, password);

    // SET COOKIE
    setCookie(c, AUTH_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: "Registration successful" });
  })
  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");

    return c.json({ user });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    // DELETE SESSION
    await account.deleteSession("current");

    // DELETE COOKIE
    deleteCookie(c, AUTH_COOKIE_NAME);

    return c.json({ success: true });
  });

export default app;
