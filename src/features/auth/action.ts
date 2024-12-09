"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { cache } from "react";

import { AUTH_COOKIE_NAME } from "@/constant";
import { config } from "@/lib/appwrite.config";

export const getCurrent = cache(async () => {
  try {
    const client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectId);

    const session = (await cookies()).get(AUTH_COOKIE_NAME);

    if (!session) {
      return null;
    }

    client.setSession(session.value);

    const account = new Account(client);
    const database = new Databases(client);

    const sessionUser = await account.get();

    const databaseUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", [sessionUser.$id])]
    );

    const user = databaseUser.documents[0];

    return user || null;
  } catch (error) {
    console.error(error);
    return null;
  }
});
