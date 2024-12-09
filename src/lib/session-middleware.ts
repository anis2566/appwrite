import "server-only";

import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_COOKIE_NAME } from "@/constant";
import {
  Account,
  Client,
  Databases,
  Models,
  Query,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";
import { config } from "./appwrite.config";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.Document | null;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectId);

    const session = getCookie(c, AUTH_COOKIE_NAME);

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const sessionUser = await account.get();

    const databaseUsers = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", sessionUser.$id)]
    );

    if (databaseUsers.documents.length > 0) {
      c.set("user", databaseUsers.documents[0]);
    } else {
      c.set("user", null);
    }

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);

    await next();
  }
);
