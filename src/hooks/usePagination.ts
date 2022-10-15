import { useEffect, useMemo, useState } from "react"
import { createPagination } from "../utils/createPagination";
import { createPages } from "../utils/createPages";
import { putElementsIntoPages } from "../utils/putElementsIntoPages";
import { PageRow } from "../data/types/PageRow";

export interface PaginationArgs {
    rowsPerPage: number
    elements: any[]
}

export type SortingWordsTypes = "" | "alphabet" | "power";

interface PaginationPill {
    onClickFn: Function
}

export const usePagination = ({rowsPerPage, elements}: PaginationArgs) => {

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pagination, setPagination]: [PaginationPill[], Function] = useState([{onClickFn: () => {}}]);
    const [rowsOnPage, setRowsOnPage]: [PageRow[], Function] = useState([]);
    const [sort, setSort]: [SortingWordsTypes, Function] = useState("");


    const {pages, requiredPagesNr} = useMemo(() => {

        const requiredPagesNr = Math.ceil(elements.length/rowsPerPage);
        const pages = createPages(requiredPagesNr);

        putElementsIntoPages(pages, rowsPerPage, elements);

        return {pages, requiredPagesNr}

    }, [elements]);



    useEffect(() => {

        const switchPage = (pageNr: number) => setCurrentPageIndex(pageNr);
        const pagination = createPagination(requiredPagesNr, switchPage);
        setPagination(pagination);

        if (sort && sort === "alphabet") pages[currentPageIndex].rows.sort((row1: PageRow, row2: PageRow) => row1.element.name.localeCompare(row2.element.name));
        if (sort && sort === "power") pages[currentPageIndex].rows.sort((row1: PageRow, row2: PageRow) => row1.element.power - row2.element.power);

        setRowsOnPage(pages[currentPageIndex].rows);

    }, [currentPageIndex, sort, elements]);


    return {pagination, rowsOnPage, currentPageIndex, setSort, sort, pages}

}