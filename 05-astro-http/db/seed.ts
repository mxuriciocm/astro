import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: "Kasim", age: 19, isActive: true },
    { id: 2, name: "Mauricio", age: 20, isActive: false },
    { id: 3, name: "Eder", age: 21, isActive: true },
    { id: 4, name: "Karla", age: 22, isActive: false },
    { id: 5, name: "Yadhira", age: 23, isActive: true },
  ]);

  const posts = await getCollection("blog");
  await db.insert(Posts).values(
    posts.map((p) => ({
      id: p.slug,
      title: p.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );
}
