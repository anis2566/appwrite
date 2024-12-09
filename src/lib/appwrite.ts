import "server-only";

import { Client, Account, Databases } from "node-appwrite";

import { config } from "./appwrite.config";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.key);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}
