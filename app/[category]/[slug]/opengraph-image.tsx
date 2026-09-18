import { ImageResponse } from "next/og"
import { getCategory } from "@/lib/categories"
import { getPost } from "@/lib/content"
import { site } from "@/lib/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category: categorySlug, slug } = await params
  const post = getPost(categorySlug, slug)
  const category = getCategory(categorySlug)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f4f1ea",
        color: "#1a1a18",
        padding: "64px",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
        {site.nameplate}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {category ? (
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#b8302a",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {category.name}
          </div>
        ) : null}
        <div style={{ display: "flex", fontSize: 60, lineHeight: 1.1, fontWeight: 700 }}>
          {post?.title ?? site.name}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#55524a" }}>{site.tagline}</div>
    </div>,
    { ...size },
  )
}
