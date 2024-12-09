import { createAdminClient } from "@/lib/appwrite";
import { config } from "@/lib/appwrite.config";
import { areas } from "@/test";
import { Metadata } from "next";
import { ID } from "node-appwrite";

export const metadata: Metadata = {
  title: "Basabaree | Home",
  description: "Home page",
}

const Home = async () => {
  const client = await createAdminClient();

  // for (let i = 0; i < areas.length; i++) {
  //   await client.database.createDocument(
  //     config.databaseId,
  //     config.areaCollectionId,
  //     ID.unique(),
  //     {
  //       name: areas[i].name,
  //       nameBangla: areas[i].nameBangla,
  //       areaId: i + 1,
  //       cityId: 1,
  //     }
  //   );
  // }

  // for (const city of cities) {
  //   await client.database.createDocument(
  //     config.databaseId,
  //     config.cityCollectionId,
  //     ID.unique(),
  //     city
  //   );
  // }

  return <div>
    Home
  </div>
}

export default Home;