import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: "Mauricio Chacon",
    age: "19",
  };
  return new Response(JSON.stringify(person), {
    status: 201,
    headers: { "Context-Type": "application/json" },
  });
};
