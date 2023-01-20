import { useEffect, useRef } from "react";
import { useProductListStore } from "../store/product-list";
import { useRouter } from "next/router";
import { ProductListPagination } from "../components/product-list-pagination";

function ProductListPage() {
  const router = useRouter();
  const requestProductList = useProductListStore((state) => state.requestProductList);

  const products = useProductListStore((state) => state.products);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (router.query.search) {
      requestProductList({
        page: router.query.page ? Number(router.query.page as string) : 1,
        query: router.query.search as string,
      });
    } else {
      requestProductList({
        page: router.query.page ? Number(router.query.page as string) : 0,
      });
    }
  }, [router.query]);

  return (
    <div className="mx-auto space-y-3">
      <div className="flex  flex-row-reverse space-x-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.replace({
              href: "/product-list",
              query: {
                search: inputRef.current?.value,
                page: router.query.page,
              },
            });
          }}
        >
          <input ref={inputRef} type={"text"} className="border border-black" />
        </form>
      </div>
      <table className="table-auto   border border-slate-400">
        <thead className="text-16 font-bold">
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((value) => (
            <tr key={value.id}>
              <td>{value.title}</td>
              <td>{value.brand}</td> <td>{value.price}</td> <td>{value.stock}</td> <td>{value.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductListPagination />
    </div>
  );
}

export default ProductListPage;
