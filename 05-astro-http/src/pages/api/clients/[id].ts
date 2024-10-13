import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const clients = await db.select().from(Clients);
    const client = clients.filter(client => client.id === +id!)
    return new Response(JSON.stringify({ method: "GET", clientId: id, ...client  }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;
  return new Response(JSON.stringify({ method: "PATCH", clientId: id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { id } = params;
  return new Response(JSON.stringify({ method: "DELETE", clientId: id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
