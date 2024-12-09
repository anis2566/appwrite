import { Hono } from "hono";
import { Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { sessionMiddleware } from "@/lib/session-middleware";
import { config } from "@/lib/appwrite.config";

const app = new Hono()
  .get("/cities", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const cities = await databases.listDocuments(
      config.databaseId,
      config.cityCollectionId,
      [Query.orderAsc("cityId")]
    );

    return c.json(cities.documents);
  })
  .get(
    "/area/:cityId",
    zValidator("param", z.object({ cityId: z.string() })),
    sessionMiddleware,
    async (c) => {
      const cityId = c.req.param("cityId");
      const databases = c.get("databases");

      const areas = await databases.listDocuments(
        config.databaseId,
        config.areaCollectionId,
        [Query.equal("cityId", parseInt(cityId)), Query.orderAsc("areaId"), Query.limit(1000)]
      );

      return c.json(areas.documents);
    }
  );

export default app;
