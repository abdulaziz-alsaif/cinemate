import { ChevronsLeft, ChevronsRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";


type ListPaginationType = {
  currentPage: number,
  totalPages: number,
  maxVisiblePages?: number
}

function ListPagination({ currentPage, totalPages, maxVisiblePages = 5 }: ListPaginationType) {
  const totalPagesNumber = Number(totalPages);

  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  const start = Math.max(currentPage - halfVisiblePages, 1);
  const end = Math.min(currentPage + halfVisiblePages, totalPagesNumber);

  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="?page=1"
            className={`hidden sm:inline-flex ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
            aria-label="Go to first page"
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage !== 1 ? currentPage - 1 : 1}`}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pageNumbers[0] > 1 && (
          <PaginationItem className="hidden [@media(min-width:450px)]:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* the className added to <PaginationItem /> hides all page numbers except those adjacent to the current page on mobile devices while showing all pages on larger screens */}
        {pageNumbers.map((pageNumber) => (
          <PaginationItem
            key={pageNumber}
            className={` ${Math.abs(pageNumber - currentPage) <= 1 ? "block" : "hidden [@media(min-width:500px)]:block"} `}
          >
            <PaginationLink
              isActive={pageNumber === currentPage}
              href={`?page=${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {(pageNumbers.at(-1) || 0) < totalPagesNumber && (
          <PaginationItem className="hidden [@media(min-width:450px)]:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage !== totalPagesNumber ? currentPage + 1 : totalPagesNumber}`}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={`?page=${totalPages}`}
            className={`hidden sm:inline-flex ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
            aria-label="Go to first page"
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ListPagination;
