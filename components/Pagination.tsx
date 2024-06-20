"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";

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
                <Button
                    disabled={page === FIRST_PAGE}
                    onClick={prevPageHandler}
                    className="cursor-pointer disabled:brightness-50"
                >
                    <PaginationItem>Prev</PaginationItem>
                </Button>

                <PaginationItem className="cursor-default">
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                <Button
                    onClick={nextPageHandler}
                    className="cursor-pointer disabled:brightness-50"
                    disabled={page === LAST_PAGE}
                >
                    <PaginationItem>Next</PaginationItem>
                </Button>
            </PaginationContent>
        </Pagination>
    );
}
