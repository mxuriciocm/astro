import type { APIRoute } from "astro";
import { db, Clients } from "astro:db";
export const prerender = false;

const clients = await db.select().from(Clients);
export const GET: APIRoute = async ({ params, request }) => {
  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();
    const response = await db.insert(Clients).values(body)
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Not body found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
