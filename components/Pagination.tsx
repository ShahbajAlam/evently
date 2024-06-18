"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationButtonProps = {
    page: number;
    FIRST_PAGE: number;
    LAST_PAGE: number;
    prevPageHandler: () => void;
    nextPageHandler: () => void;
};

export function PaginationButton(props: PaginationButtonProps) {
    const { page, FIRST_PAGE, LAST_PAGE, prevPageHandler, nextPageHandler } =
        props;

    return (
        <Pagination className="self-center">
            <PaginationContent>
                <PaginationItem
                    onClick={prevPageHandler}
                    className="cursor-pointer"
                    aria-disabled={page === FIRST_PAGE}
                >
                    <PaginationPrevious />
                </PaginationItem>

                <PaginationItem className="cursor-default">
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                <PaginationItem
                    onClick={nextPageHandler}
                    className="cursor-pointer"
                    aria-disabled={page === LAST_PAGE}
                >
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
