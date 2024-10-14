import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const clients = await db.select().from(Clients);
  // const client = clients.filter((client) => client.id === +id!); Other solution for get a clientbyid
  const client = await db.select().from(Clients).where(eq(Clients.id, +id!)) 
  return new Response(JSON.stringify(client), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};  

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = params;
  try {
    const body = await request.json();
    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +id!));
    const updateClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +id!));
    return new Response(JSON.stringify(updateClient), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: `No body found` }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +id!));
  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: "Deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(
    JSON.stringify({ msg: `Client with id ${id} not found` }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
