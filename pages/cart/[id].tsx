import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useCartDetailStore } from "../../store/cart-detail";

function ProductListPage() {
  const router = useRouter();
  const requestProductList = useCartDetailStore((state) => state.requestCart);

  const products = useCartDetailStore((state) => state.products);
  const cartData = useCartDetailStore((state) => state.cartData);

  useEffect(() => {
    if (router.query.id) {
      requestProductList({
        id: Number(router.query.id),
        page: Number(router.query.page) || 1,
      });
    }
  }, [router.query]);

  /**
   *
   */
  return (
    <div className="mx-auto space-y-3">
      <div>Cart {cartData?.title}</div>
      <div className="flex flex-col bg-gray-400 p-3 rounded-md">
        <div>User : {cartData?.userId}</div>
        <div>Total : {cartData?.total}</div>
        <div>Quantity : {cartData?.totalQuantity}</div>
      </div>
      <table className="table-auto   border border-slate-400">
        <thead className="text-16 font-bold">
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quntity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((value) => (
            <tr key={value.id}>
              <td>{value.title}</td>
              <td>{value.price}</td>
              <td>{value.quantity}</td>
              <td>{value.total}</td>
            </tr>
          ))}
        </tbody>
        {/* <ProductListPagination /> */}
      </table>
    </div>
  );
}

export default ProductListPage;
