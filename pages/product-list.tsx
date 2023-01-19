import { useEffect } from "react";
import {  useProductListStore } from "../store/product-list";

function ProductListPage(){
    const requestProductList = useProductListStore((state)=>state.requestProductList)
    const products = useProductListStore((state)=>state.products)

    useEffect(()=>{
        requestProductList()
    },[])

    console.log(products)

    return <div className="mx-auto ">
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
                {products?.map((value)=>(<tr>
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
    </div>
}

export default ProductListPage