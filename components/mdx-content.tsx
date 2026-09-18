"use client"

import { useMemo } from "react"
import * as runtime from "react/jsx-runtime"
import { PullQuote } from "@/components/pull-quote"

const mdxComponents = {
  PullQuote,
}

type MdxModule = { default: React.ComponentType<{ components?: typeof mdxComponents }> }

function useMdxComponent(code: string) {
  return useMemo(() => {
    const fn = new Function(code)
    return (fn(runtime) as MdxModule).default
  }, [code])
}

export function MdxContent({ code }: { code: string }) {
  const Component = useMdxComponent(code)
  return (
    <div className="article-body font-body prose prose-lg dark:prose-invert prose-headings:font-headline prose-headings:font-black prose-a:text-press-red prose-blockquote:border-l-ink max-w-none">
      <Component components={mdxComponents} />
    </div>
  )
}
