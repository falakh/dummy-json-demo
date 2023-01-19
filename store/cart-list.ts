import { create } from 'zustand'
const cartListUrl = 'https://dummyjson.com/carts'

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


interface ICartStore{
    products?:ICart[],
    isLoading?:boolean,
    requestCart:()=>void
}

export const useCartListStore = create<ICartStore>((set) => ({
    requestCart:async ()=>{
        set({isLoading:true})
        const cartRequest = await fetch(cartListUrl)
        const cartResponse = await cartRequest.json()
        set({isLoading:false,products:cartResponse.carts})
    }
}))