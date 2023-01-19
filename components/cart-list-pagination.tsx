import { useRouter } from "next/router";
import { useCartListStore } from "../store/cart-list";

export function CartListPagination() {
  const router = useRouter();
  const pagination = useCartListStore((state) => state.pagination);
  const totalPage = (pagination?.total ?? 0) / 10;
  const currentPage = (pagination?.skip ?? 10) / 10 + 1;
  return (
    <div className="flex flex-row text-right space-x-2 align-baseline">
      <div className="grow"></div>
      <button
        onClick={() => {
          router.replace({
            href: "/cart-list",
            query: {
              page: currentPage - 1,
            },
          });
        }}
        disabled={pagination?.skip === 0}
      >
        Prev
      </button>
      <div className="text-center align-middle">
        Page {currentPage}/{totalPage}
      </div>
      <button
        onClick={() => {
          router.replace({
            href: "/cart-list",
            query: {
              page: currentPage + 1,
            },
          });
        }}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
}
