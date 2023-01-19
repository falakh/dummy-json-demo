import { useEffect, useRef } from "react";
import { useCartListStore } from "../store/cart-list";

function ProductListPage(){
    const requestCartList = useCartListStore((state)=>state.requestCart)
    const products = useCartListStore((state)=>state.products)
    useEffect(()=>{
        requestCartList()
    },[])
/**
 *   products: Product[];
        total: number;
        discountedTotal: number;
        userId: number;
        totalProducts: number;
        totalQuantity: number;
 */

    return <div className="mx-auto space-y-3">
  
        <table className="table-auto   border border-slate-400">
            <thead className="text-16 font-bold">
            <tr>
                <th >
                    User Id
                </th>   
                <th >
                    Total
                </th>   
                
                <th >
                Total Product
                </th>
                <th >
                    Total Quantity
                </th>
            </tr>
            </thead>
            <tbody>
                {products?.map((value)=>(<tr>
                    <td>
                        {value.userId}
                    </td>
                    <td>
                        {value.total}
                    </td> 
                     <td>
                        {value.totalProducts}
                    </td>  <td>
                        {value.totalQuantity}
                    </td>
                </tr>))}
            </tbody>
        </table>
    </div>
}

export default ProductListPage