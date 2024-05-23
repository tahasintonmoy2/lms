import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { Course } from "@prisma/client";

interface WishlistStore {
  items: Course[];
  addItem: (data: Course) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useWishlist = create(
  persist<WishlistStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Course) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);

        if (existingItems) {
          return toast.info("This item already in the wishlist");
        }

        set({ items: [...get().items, data] });
        toast.success("Item Added to wishlist");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed form the wishlist");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
