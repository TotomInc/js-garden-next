import type { MetadataRoute } from "next";

import { getAllPosts } from "../lib/api";

const BASE_URL = "https://jsgarden.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts(["slug"]);

  const staticRoutes = ["", "spotify"];

  return [
    ...staticRoutes.map((route) => ({ url: `${BASE_URL}/${route}` })),
    ...posts.map(({ slug }) => ({ url: `${BASE_URL}/blog/${slug}` })),
  ];
}
