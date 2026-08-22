import type { MetadataRoute } from "next";

const baseUrl = "https://studyflow-id.duckdns.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/login",
    "/register",
    "/dashboard",
    "/courses",
    "/assignments",
    "/goals",
    "/calendar",
    "/settings",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
