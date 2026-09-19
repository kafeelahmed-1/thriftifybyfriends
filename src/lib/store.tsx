import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  condition: string;
  size: string;
  measurements: string;
  image: string;
  status?: string;
};

export const products: Product[] = [
  { id: "retro-court-sneakers", name: "Retro Court Sneakers", category: "Shoes", price: 6490, oldPrice: 7990, condition: "Mint 10/10", size: "EU 42", measurements: "Insole 27 cm", image: "/images/product-sneakers.jpg", status: "Just dropped" },
  { id: "varsity-jacket", name: "Heritage Varsity Jacket", category: "Jackets", price: 8990, condition: "Like New", size: "M", measurements: "Chest 22 in · Length 26 in", image: "/images/product-jacket.jpg", status: "One of one" },
  { id: "leather-shoulder-bag", name: "90s Leather Shoulder Bag", category: "Bags", price: 5490, oldPrice: 6490, condition: "Gently Used", size: "One size", measurements: "12 × 8 × 4 in", image: "/images/product-bag.jpg", status: "Vintage find" },
  { id: "striped-oxford-shirt", name: "Striped Oxford Shirt", category: "Shirts", price: 3290, condition: "Like New", size: "L", measurements: "Chest 23 in · Length 29 in", image: "/images/product-shirt.jpg", status: "Fresh pick" },
];

type CartLine = { product: Product; quantity: number };
type StoreState = {
  cart: CartLine[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  count: number;
  subtotal: number;
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const value = useMemo<StoreState>(() => ({
    cart,
    add: (product) => setCart((current) => {
      const found = current.find((line) => line.product.id === product.id);
      return found
        ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }];
    }),
    remove: (id) => setCart((current) => current.filter((line) => line.product.id !== id)),
    setQuantity: (id, quantity) => setCart((current) => quantity < 1 ? current.filter((line) => line.product.id !== id) : current.map((line) => line.product.id === id ? { ...line, quantity } : line)),
    count: cart.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
  }), [cart]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

export const formatPKR = (value: number) => `PKR ${value.toLocaleString("en-PK")}`;