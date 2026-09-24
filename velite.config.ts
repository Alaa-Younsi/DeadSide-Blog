import readingTime from "reading-time"
import rehypePrettyCode from "rehype-pretty-code"
import { defineCollection, defineConfig, s } from "velite"
import { categories } from "./lib/categories"

const categorySlugs = categories.map((category) => category.slug) as [string, ...string[]]

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(140),
      slug: s.slug("posts"),
      category: s.enum(categorySlugs),
      date: s.isodate(),
      updated: s.isodate().optional(),
      excerpt: s.string().max(320),
      cover: s.string().optional(),
      tags: s
        .array(s.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "tags must be lowercase-kebab-case"))
        .default([]),
      author: s.string(),
      featured: s.boolean().default(false),
      featuredOrder: s.number().optional(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      readingTime: `${Math.max(1, Math.ceil(readingTime(data.body).minutes))} min read`,
      url: `/${data.category}/${data.slug}`,
    })),
})

export default defineConfig({
  root: "content",
  collections: { posts },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            dark: "github-dark",
          },
          keepBackground: false,
        },
      ],
    ],
  },
})
