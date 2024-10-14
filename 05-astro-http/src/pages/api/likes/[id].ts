import type { APIRoute } from "astro";
import { eq, db, Posts, like } from "astro:db";
export const prerender = false

export const GET: APIRoute = async ({ params, request }) =>{

    const { id } = params;
    const posts = await db.select().from(Posts).where(eq(Posts.id, id!))
    
    if (posts.length === 0){
        const post = {
            id: id,
            title: 'Post not found',
            likes: 0
        }
        return new Response(JSON.stringify(post), {status: 200, headers: {'Content-Type': 'application/json'}})
    }

    return new Response(JSON.stringify(posts.at(0)), {status: 200, headers: {'Content-Type': 'application/json'}})
}