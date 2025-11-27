import { create } from "zustand";

export interface ProductData {
  id: string;
  name: string;
  power: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  weight: number;
  height: number;
  width: number;
  length: number;
  model_code: string;
  colour: string;
  img_url: string;
}

interface ProductState {
  product: ProductData | null;
  basketCount: number;
  fetchProduct: (id: number) => Promise<void>;
  addToBasket: (quantity: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: null,
  basketCount: 0,
  fetchProduct: async (id: number) => {
    if (typeof fetch === "undefined") return;
    try {
      const res = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              Product(id: ${id}) {
                id
                name
                power
                description
                price
                quantity
                brand
                weight
                height
                width
                length
                model_code
                colour
                img_url
              }
            }
          `,
        }),
      });
      const json = await res.json();
      if (json.data && json.data.Product) {
        set({ product: json.data.Product });
      }
    } catch (e) {
      console.error("Failed to fetch product", e);
    }
  },
  addToBasket: (quantity: number) =>
    set((state) => ({ basketCount: state.basketCount + quantity })),
}));
