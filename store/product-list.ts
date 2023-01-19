import { create } from 'zustand'
const productListUrl = 'https://dummyjson.com/products'

interface IProduct{
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

interface IProductStore{
    products?:IProduct[],
    isLoading?:boolean,
    requestProductList:()=>void
}

export const useProductListStore = create<IProductStore>((set) => ({
    requestProductList:async ()=>{
        set({isLoading:true})
        const productRequest = await fetch(productListUrl)
        const productResponse = await productRequest.json()
        set({isLoading:false,products:productResponse.products})
    }
}))