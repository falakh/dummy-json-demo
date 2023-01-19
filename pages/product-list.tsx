import { useEffect, useRef } from "react";
import {  useProductListStore } from "../store/product-list";
import { useRouter } from "next/router";

function ProductListPage(){
    const router = useRouter()
    const requestProductList = useProductListStore((state)=>state.requestProductList)
    const pagination = useProductListStore((state)=>state.pagination)

    const products = useProductListStore((state)=>state.products)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{
console.log(router.query)
            if(router.query.search){
                requestProductList({
                    page: router.query.page ? Number(router.query.page as string):1,
                    query:router.query.search as string
                })
            }else{
                requestProductList({
                    page: router.query.page ? Number(router.query.page as string):0,
                })
            }
       
    },[router.query])


    return <div className="mx-auto space-y-3">
        <div className="flex  flex-row-reverse space-x-2">
            <form onSubmit={(e)=>{
                e.preventDefault()
                router.replace({
                    href:'/product-list',
                    query:{
                        search:inputRef.current?.value,
                        page:router.query.page
                    }
                })
                }}>
            <input name="query" ref={inputRef} type={"text"} className="border border-black"/>
            </form>
        </div>
        <table className="table-auto   border border-slate-400">
            <thead className="text-16 font-bold">
            <tr>
                <th >
                    Product Name
                </th>   
                <th >
                    Brand
                </th>   
                <th >
                    Price
                </th>   
                <th >
                    Stock
                </th>
                <th >
                    Category
                </th>
            </tr>
            </thead>
            <tbody>
                {products?.map((value)=>(<tr key={value.id}>
                    <td>
                        {value.title}
                    </td>
                    <td>
                        {value.brand}
                    </td>  <td>
                        {value.price}
                    </td>  <td>
                        {value.stock}
                    </td>  <td>
                        {value.category}
                    </td>
                </tr>))}
            </tbody>
        </table>
        <div className="flex flex-row text-right space-x-2 align-baseline">
            <div className="grow">

            </div>
            <button onClick={()=>{
                   router.replace({
                    href:'/product-list',
                    query:{
                        search:router.query.search,
                        page:Number(router.query.page) -1
                    }
                })
            }} disabled={pagination?.skip===0}>
                Prev
            </button>
            <div className="text-center align-middle">
                Page {((pagination?.skip ??10)/10)+1}/{(pagination?.total??0)/10}
            </div>
            <button onClick={()=>{
                   router.replace({
                    href:'/product-list',
                    query:{
                        search:router.query.search,
                        page:Number(router.query.page) +1
                    }
                })
            }} disabled={pagination?.skip===pagination?.total}>
                Next
            </button>
        </div>
    </div>
}

export default ProductListPage