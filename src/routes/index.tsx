import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront";
import { products } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Thriftify — Curated Vintage Fashion in Pakistan" },
    { name: "description", content: "Shop one-of-one vintage shoes, jackets, shirts and bags, condition-checked and delivered across Pakistan." },
    { property: "og:title", content: "Thriftify — Curated Vintage Fashion" },
    { property: "og:description", content: "Rare finds, honest condition grading, nationwide cash on delivery." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Home,
});

function Home() {
  const categories = products.map((product, index) => ({
    name: product.category,
    image: product.image,
    kicker: ["Everyday icons", "Statement layers", "Carry the story", "Fresh classics"][index] ?? "Rare finds",
  }));
  return <>
    <section className="relative min-h-[620px] overflow-hidden bg-foreground md:min-h-[700px]">
      <img src="/images/thriftify-hero.jpg" alt="Friends wearing Thriftify vintage varsity jackets" width={1536} height={864} className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-end px-4 pb-12 md:min-h-[700px] md:items-center md:px-8 md:pb-0">
        <div className="max-w-xl text-primary-foreground">
          <p className="mb-4 text-sm font-black uppercase tracking-[.18em]">Drop 09 · Just landed</p>
          <h1 className="font-display text-5xl font-black uppercase leading-[.95] md:text-7xl">Old school.<br/>New energy.</h1>
          <p className="mt-6 max-w-md text-base font-medium md:text-lg">One-of-one vintage pieces, selected by friends. Cleaned, checked and ready for their next story.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="h-12 bg-background px-7 text-foreground hover:bg-background/90"><Link to="/shop" search={{ category: "New Drops" }}>Shop the drop <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg" className="h-12 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-foreground"><Link to="/about">Our story</Link></Button></div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-4 py-16 lg:px-8 lg:py-24"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-black uppercase text-primary">Shop your lane</p><h2 className="mt-2 font-display text-3xl font-black uppercase md:text-5xl">Find your next favourite</h2></div><Button asChild variant="link" className="hidden md:inline-flex"><Link to="/shop" search={{}}>View all <ArrowRight/></Link></Button></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">{categories.map((item) => <Link key={item.name} to="/shop" search={{ category: item.name }} className="group relative overflow-hidden bg-muted"><img src={item.image} alt={item.name} width={816} height={816} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-x-0 bottom-0 bg-category-overlay p-4 pt-16 text-primary-foreground md:p-6"><p className="text-xs font-bold uppercase">{item.kicker}</p><h3 className="font-display text-2xl font-black uppercase md:text-3xl">{item.name}</h3></div></Link>)}</div></section>
    <section className="bg-secondary"><div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-8 lg:py-24"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-black uppercase text-primary">Freshly curated</p><h2 className="mt-2 font-display text-3xl font-black uppercase md:text-5xl">New arrivals</h2></div><Button asChild variant="outline" className="hidden md:inline-flex"><Link to="/shop" search={{ category: "New Drops" }}>Shop new drops</Link></Button></div><div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-6">{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div></div></section>
    <section className="grid md:grid-cols-2"><div className="min-h-[440px]"><img src="/images/thriftify-collection.jpg" alt="Curated Thriftify collection" width={1024} height={1024} loading="lazy" className="size-full object-cover"/></div><div className="flex items-center bg-primary p-8 text-primary-foreground md:p-16"><div className="max-w-lg"><p className="text-sm font-black uppercase tracking-[.16em]">Why thrift with us</p><h2 className="mt-4 font-display text-4xl font-black uppercase md:text-6xl">Better finds.<br/>Less waste.</h2><p className="mt-6 text-lg">Every piece is handpicked, carefully inspected and honestly graded. No mystery stains. No misleading photos. Just great clothes with more life to live.</p><Button asChild size="lg" className="mt-8 h-12 bg-background text-foreground hover:bg-background/90"><Link to="/about">Meet the friends <ArrowRight/></Link></Button></div></div></section>
    <section className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-border px-4 py-16 lg:grid-cols-4 lg:px-8">{[{Icon:ShieldCheck,title:"Authenticity verified",copy:"Every piece inspected"},{Icon:PackageCheck,title:"Clean & checked",copy:"Ready to wear"},{Icon:Truck,title:"Nationwide COD",copy:"Across Pakistan"},{Icon:BadgeCheck,title:"Honest grading",copy:"What you see is what you get"}].map(({Icon,title,copy}) => <div key={title} className="bg-background p-6 text-center"><Icon className="mx-auto size-7 text-primary"/><h3 className="mt-3 font-bold uppercase">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{copy}</p></div>)}</section>
  </>;
}