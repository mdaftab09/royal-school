const siteUrl = "https://www.royalenglishmediumschool.in";

export default function sitemap() {
  const routes = [
    "",
    "/about",
    "/academics",
    "/admissions",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
