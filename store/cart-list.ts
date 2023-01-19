import { create } from "zustand";
const cartListUrl = "https://dummyjson.com/carts";

export interface ICart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface ICart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface IRawResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}

interface ICartListProps {
  page?: number;
}
interface ICartStore {
  products?: ICart[];
  isLoading?: boolean;
  requestCart: (props: ICartListProps) => void;
  pagination?: {
    total: number;
    skip: number;
    limit: number;
  };
}

export const useCartListStore = create<ICartStore>((set) => ({
  requestCart: async (props) => {
    const deffaultQuery = new URLSearchParams();
    deffaultQuery.append("limit", "10");
    if (props.page && (props.page || 0) > 0) {
      deffaultQuery.append("skip", (props.page * 10).toString());
    }
    set({ isLoading: true });
    const cartRequest = await fetch(cartListUrl + "?" + deffaultQuery.toString());
    const cartResponse = await cartRequest.json();
    set({
      isLoading: false,
      products: cartResponse.carts,
      pagination: {
        limit: cartResponse.limit,
        skip: cartResponse.skip,
        total: cartResponse.total,
      },
    });
  },
}));
