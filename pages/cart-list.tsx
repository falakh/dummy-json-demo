import { useEffect } from "react";
import { useCartListStore } from "../store/cart-list";
import { CartListPagination } from "../components/cart-list-pagination";
import { useRouter } from "next/router";

function CartListPage() {
  const requestCartList = useCartListStore((state) => state.requestCart);
  const products = useCartListStore((state) => state.products);
  const router = useRouter();
  useEffect(() => {
    requestCartList({ page: Number(router.query.page) });
  }, [router.query.page]);

  return (
    <div className="mx-auto space-y-3">
      <table className="table-auto   border border-slate-400">
        <thead className="text-16 font-bold">
          <tr>
            <th>User Id</th>
            <th>Total</th>
            <th>Total Product</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((value) => (
            <tr key={value.id}>
              <td>{value.userId}</td>
              <td>{value.total}</td>
              <td>{value.totalProducts}</td>
              <td>{value.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CartListPagination />
    </div>
  );
}

export default CartListPage;
