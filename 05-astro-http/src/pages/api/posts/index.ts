import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
export const prerender = false; // using server side rendenring (SSR) only in this method

export const GET: APIRoute = async ({ params, request }) => {
  const posts = await getCollection("blog");
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Context-Type": "application/json" },
  });
};
