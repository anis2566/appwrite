export const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  key: process.env.NEXT_APPWRITE_KEY!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  cityCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CITY_COLLECTION_ID!,
  areaCollectionId: process.env.NEXT_PUBLIC_APPWRITE_AREA_COLLECTION_ID!,
};