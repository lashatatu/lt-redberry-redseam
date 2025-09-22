import { Link } from "@tanstack/react-router";

const ProductsPaginationComponent = ({ products }) => {
  const currentPage = products.meta.current_page;
  const totalPages = products.meta.last_page;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row gap-2">
        {pages.map((pageNum) => (
          <div
            key={pageNum}
            className={`border rounded p-1 transition-colors ${
              pageNum === currentPage ? "text-red-500" : ""
            }`}
          >
            <Link
              to="/products"
              search={{ page: pageNum }}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPaginationComponent;
