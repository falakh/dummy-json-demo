import { useRouter } from "next/router";
import { useProductListStore } from "../store/product-list";

export function ProductListPagination() {
  const pagination = useProductListStore((state) => state.pagination);
  const router = useRouter();
  return (
    <div className="flex flex-row text-right space-x-2 align-baseline">
      <div className="grow"></div>
      <button
        onClick={() => {
          router.replace({
            href: "/product-list",
            query: {
              search: router.query.search,
              page: Number(router.query.page) - 1,
            },
          });
        }}
        disabled={pagination?.skip === 0}
      >
        Prev
      </button>
      <div className="text-center align-middle">
        Page {(pagination?.skip ?? 10) / 10 + 1}/{(pagination?.total ?? 0) / 10}
      </div>
      <button
        onClick={() => {
          router.replace({
            href: "/product-list",
            query: {
              search: router.query.search,
              page: (Number(router.query.page) ?? 1) + 1,
            },
          });
        }}
        disabled={pagination?.skip === pagination?.total}
      >
        Next
      </button>
    </div>
  );
}
