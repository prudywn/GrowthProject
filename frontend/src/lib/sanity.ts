import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "ytu6ofa6",
  dataset: "production",
  useCdn: false,
  apiVersion: "v2025-06-20",
});
