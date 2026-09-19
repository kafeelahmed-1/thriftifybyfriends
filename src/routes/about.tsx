import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Thriftify" },
      { name: "description", content: "Thriftify is a vintage brand made by friends, bringing circular fashion and great pre-loved style to Pakistan." },
      { property: "og:title", content: "Our Story — Thriftify" },
      { property: "og:description", content: "A better closet, built by friends." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div>
      <section className="bg-primary px-4 py-20 text-primary-foreground md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[.2em]">Thriftify — By friends</p>
          <h1 className="mt-5 font-display text-5xl font-black uppercase leading-none md:text-7xl">Made by friends, built for better closets.</h1>
          <p className="mt-6 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            We started Thriftify with one simple idea: good style should be accessible, sustainable, and full of personality.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center lg:px-8 lg:py-24">
        <img src="/images/thriftify-collection.jpg" alt="A curated thrift collection" width={1024} height={1024} className="w-full rounded-none object-cover" />
        <div>
          <p className="text-sm font-black uppercase tracking-[.22em] text-primary">Our story</p>
          <h2 className="mt-4 font-display text-4xl font-black uppercase">A vintage shop built on friendship.</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>Thriftify began as a habit between friends: hunting for overlooked gems, cleaning them up, and styling them into something fresh again.</p>
            <p>We wanted to create a store that feels personal, honest, and full of character. Every piece is chosen for quality, authenticity, and the kind of wear that makes a wardrobe feel lived in.</p>
            <p>Our mission is simple: give secondhand fashion a second life, keep great pieces in circulation, and help people build wardrobes that feel unique, sustainable, and easy to love.</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Curated by friends", "We handpick standout pieces with soul, quality and personality."],
              ["Cleaned to wear", "Each item is checked, refreshed, and made ready for a new chapter."],
              ["Slow fashion, thoughtful style", "Pre-loved pieces mean less waste and more character in every outfit."],
            ].map(([title, copy]) => (
              <div key={title} className="border border-border bg-background p-6">
                <p className="text-xs font-black uppercase tracking-[.2em] text-primary">01</p>
                <h3 className="mt-4 font-display text-2xl font-black uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-8 rounded-none border border-border bg-background p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[.2em] text-primary">Shop the story</p>
            <h3 className="mt-3 font-display text-4xl font-black uppercase">Find pieces with a past and a future.</h3>
          </div>
          <a href="/shop" className="inline-flex items-center gap-2 font-black uppercase text-primary">
            Explore the drop <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </div>
  ),
});