import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { name: string; price: number; qty: number };

type ShopContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: { name: string; price: number }) => void;
  remove: (name: string) => void;
  setQty: (name: string, qty: number) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const STORAGE_KEY = "lumina-cart";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((item: { name: string; price: number }) => {
    setItems((prev) => {
      const found = prev.find((i) => i.name === item.name);
      if (found) return prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const remove = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const setQty = useCallback((name: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.name !== name)
        : prev.map((i) => (i.name === name ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<ShopContextValue>(
    () => ({
      items,
      count: items.reduce((a, i) => a + i.qty, 0),
      total: items.reduce((a, i) => a + i.qty * i.price, 0),
      add,
      remove,
      setQty,
      clear,
      cartOpen,
      setCartOpen,
      assistantOpen,
      setAssistantOpen,
    }),
    [items, add, remove, setQty, clear, cartOpen, assistantOpen],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
