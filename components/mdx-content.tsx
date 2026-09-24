import type { ComponentType } from "react"
import * as runtime from "react/jsx-runtime"
import { PullQuote } from "@/components/pull-quote"

const mdxComponents = {
  PullQuote,
}

type MdxModule = { default: ComponentType<{ components?: typeof mdxComponents }> }

// Server-only: Velite compiles MDX to a function body at build time, and evaluating it here
// keeps `new Function` out of the browser, where the CSP (no 'unsafe-eval') would block it.
function getMdxComponent(code: string) {
  const fn = new Function(code)
  return (fn(runtime) as MdxModule).default
}

export function MdxContent({ code }: { code: string }) {
  const Component = getMdxComponent(code)
  return (
    <div className="article-body font-body prose prose-lg dark:prose-invert prose-headings:font-headline prose-headings:font-black prose-a:text-press-red prose-blockquote:border-l-ink max-w-none">
      <Component components={mdxComponents} />
    </div>
  )
}
