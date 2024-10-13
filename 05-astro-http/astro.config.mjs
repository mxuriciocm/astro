// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  output: "hybrid",
  // Modes: 'hybrid' or 'server'
  // 'server' - only static generation
  // 'hybrid' - dynamic generation in some cases when defined
  adapter: node({
    mode: "standalone",
  }),
});
