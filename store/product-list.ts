import { create } from "zustand";
const productListUrl = "https://dummyjson.com/products";
const productSearchUrl = "https://dummyjson.com/products/search";
interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface IProductLIstProps {
  query?: string;
  page?: number;
}
interface IProductStore {
  products?: IProduct[];
  isLoading?: boolean;
  pagination?: {
    total: number;
    skip: number;
    limit: number;
  };
  requestProductList: (props?: IProductLIstProps) => void;
}

/**
 * "total": 100,
  "skip": 0,
  "limit": 30
 */
export const useProductListStore = create<IProductStore>((set) => ({
  requestProductList: async (query) => {
    const deffaultQuery = new URLSearchParams();
    deffaultQuery.append("limit", "10");
    if (query?.query && query?.query.length > 0) {
      deffaultQuery.append("q", query?.query);
    }
    if ((query?.page || 0) > 0) {
      deffaultQuery.append("skip", ((query?.page ?? 0) * 10).toString());
    }

    set({ isLoading: true });
    if (!query?.query) {
      const productRequest = await fetch(productListUrl + "?" + deffaultQuery.toString());
      const productResponse = await productRequest.json();
      set({
        isLoading: false,
        products: productResponse.products,
        pagination: {
          limit: productResponse.limit,
          skip: productResponse.skip,
          total: productResponse.total,
        },
      });
    } else {
      const productSearchRequest = await fetch(productSearchUrl + deffaultQuery.toString());
      const productSearchResponse = await productSearchRequest.json();
      set({
        isLoading: false,
        products: productSearchResponse.products,
        pagination: {
          limit: productSearchResponse.limit,
          skip: productSearchResponse.skip,
          total: productSearchResponse.total,
        },
      });
    }
  },
}));
