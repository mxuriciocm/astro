import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogPosts = await getCollection("blog");
  return rss({
    // stylesheet: '/styles/rss.xsl',
    title: "Mauricio Blog",
    description: "Un simple blog sobre mis aventuras con Astro",
    site: site ?? "",
    items: blogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}`
    })),
    customData: `<language>es-es</language>`,
  });
};
