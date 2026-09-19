import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatPKR, type Product, useStore } from "@/lib/store";

const nav = [
  ["Shoes", "Shoes"], ["Jackets", "Jackets"], ["Shirts", "Shirts"], ["Bags", "Bags"], ["Sale", "Sale"], ["New Drops", "New Drops"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const { count } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  return <div className="min-h-screen bg-background text-foreground">
    <div className="ticker flex h-8 items-center overflow-hidden bg-primary text-primary-foreground">
      <div>Cash on Delivery Across Pakistan <span>•</span> Fast Dispatch in 24–48 Hours <span>•</span> Curated, Cleaned & Condition-Checked <span>•</span></div>
    </div>
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-5 px-4 lg:px-8">
        <MobileMenu />
        <Link to="/" className="mr-auto flex flex-col leading-none" aria-label="Thriftify home">
          <span className="font-display text-3xl font-black uppercase text-primary">Thriftify</span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[.28em] text-foreground">By friends</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map(([label, category]) => <Link key={label} to="/shop" search={{ category }} className="text-sm font-bold uppercase transition-colors hover:text-primary">{label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen((v) => !v)} aria-label="Search"><Search /></Button>
          <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" aria-label="WhatsApp help" className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent"><MessageCircle className="size-5" /></a>
          <CartDrawer><Button variant="ghost" size="icon" className="relative" aria-label={`Cart with ${count} items`}><ShoppingBag />{count > 0 && <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}</Button></CartDrawer>
        </div>
      </div>
      {searchOpen && <div className="border-t border-border px-4 py-3"><form action="/shop" className="mx-auto flex max-w-2xl gap-2"><Input name="q" autoFocus placeholder="Search vintage finds…" className="h-11" /><Button type="submit" className="h-11">Search</Button><Button type="button" size="icon" variant="ghost" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></Button></form></div>}
    </header>
    <main>{children}</main>
    <Footer />
  </div>;
}

function MobileMenu() {
  return <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger><SheetContent side="left" className="w-[88%]"><SheetHeader><SheetTitle className="font-display text-2xl font-black uppercase text-primary">Thriftify</SheetTitle><SheetDescription>Curated vintage, by friends.</SheetDescription></SheetHeader><nav className="mt-8 flex flex-col">{nav.map(([label, category]) => <SheetClose asChild key={label}><Link to="/shop" search={{ category }} className="border-b border-border py-4 text-lg font-bold uppercase">{label}</Link></SheetClose>)}<SheetClose asChild><Link to="/about" className="border-b border-border py-4 text-lg font-bold uppercase">Our story</Link></SheetClose></nav></SheetContent></Sheet>;
}

export function CartDrawer({ children }: { children: ReactNode }) {
  const { cart, subtotal, setQuantity, remove } = useStore();
  return <Sheet><SheetTrigger asChild>{children}</SheetTrigger><SheetContent className="flex w-full flex-col sm:max-w-md"><SheetHeader><SheetTitle className="font-display text-2xl font-black uppercase">Your bag</SheetTitle><SheetDescription>{cart.length ? `${cart.length} unique thrift finds reserved.` : "Your bag is ready for a rare find."}</SheetDescription></SheetHeader><div className="mt-6 flex-1 space-y-5 overflow-y-auto">{cart.length === 0 ? <div className="flex h-56 flex-col items-center justify-center border-y border-border text-center"><ShoppingBag className="mb-4 size-8 text-muted-foreground"/><p className="font-bold">Your bag is empty</p><SheetClose asChild><Button asChild className="mt-4"><Link to="/shop" search={{}}>Shop new drops</Link></Button></SheetClose></div> : cart.map(({ product, quantity }) => <div key={product.id} className="grid grid-cols-[88px_1fr] gap-4 border-b border-border pb-5"><img src={product.image} alt="" className="aspect-square w-full object-cover"/><div><p className="text-xs font-bold uppercase text-primary">{product.condition}</p><p className="font-bold">{product.name}</p><p className="text-sm text-muted-foreground">{product.size}</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center border border-border"><Button variant="ghost" size="icon" className="size-8" onClick={() => setQuantity(product.id, quantity - 1)} aria-label="Decrease quantity"><Minus /></Button><span className="w-7 text-center text-sm">{quantity}</span><Button variant="ghost" size="icon" className="size-8" onClick={() => setQuantity(product.id, quantity + 1)} aria-label="Increase quantity"><Plus /></Button></div><Button variant="ghost" size="icon" onClick={() => remove(product.id)} aria-label={`Remove ${product.name}`}><Trash2 /></Button></div><p className="mt-2 font-bold">{formatPKR(product.price * quantity)}</p></div></div>)}</div>{cart.length > 0 && <div className="border-t border-border pt-5"><div className="mb-5 flex justify-between text-lg font-black"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div><SheetClose asChild><Button asChild size="lg" className="h-12 w-full uppercase"><Link to="/cart">View bag & checkout</Link></Button></SheetClose></div>}</SheetContent></Sheet>;
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();
  return <article className="group min-w-0"><Link to="/product/$productId" params={{ productId: product.id }} className="relative block overflow-hidden bg-muted"><img src={product.image} alt={product.name} width={816} height={816} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute left-3 top-3 bg-background px-2.5 py-1 text-[11px] font-black uppercase text-foreground">{product.condition}</span>{product.oldPrice && <span className="absolute right-3 top-3 bg-primary px-2.5 py-1 text-[11px] font-black uppercase text-primary-foreground">Sale</span>}</Link><div className="pt-4"><p className="text-xs font-bold uppercase text-muted-foreground">{product.category} · {product.size}</p><Link to="/product/$productId" params={{ productId: product.id }} className="mt-1 block font-display text-lg font-bold hover:text-primary">{product.name}</Link><div className="mt-2 flex items-center gap-2"><span className="font-black">{formatPKR(product.price)}</span>{product.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatPKR(product.oldPrice)}</span>}</div><Button onClick={() => add(product)} variant="outline" className="mt-4 w-full uppercase group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><Plus /> Quick add</Button></div></article>;
}

function Footer() {
  return <footer className="border-t border-border bg-secondary"><div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 md:grid-cols-4 lg:px-8"><div><p className="font-display text-3xl font-black uppercase text-primary">Thriftify</p><p className="mt-2 max-w-xs text-sm text-muted-foreground">One-of-one vintage finds, handpicked by friends and delivered across Pakistan.</p></div><div><p className="font-bold uppercase">Shop</p><div className="mt-4 flex flex-col gap-2 text-sm"><Link to="/shop" search={{}}>All products</Link><Link to="/shop" search={{ category: "New Drops" }}>New drops</Link><Link to="/cart">Your bag</Link></div></div><div><p className="font-bold uppercase">Help</p><div className="mt-4 flex flex-col gap-2 text-sm"><Link to="/contact">Contact us</Link><Link to="/returns">Returns & exchanges</Link><Link to="/privacy">Privacy policy</Link></div></div><div><p className="font-bold uppercase">The story</p><div className="mt-4 flex flex-col gap-2 text-sm"><Link to="/about">About Thriftify</Link><a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">WhatsApp help</a></div></div></div><div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">© 2026 Thriftify — By friends. Built for better closets.</div></footer>;
}