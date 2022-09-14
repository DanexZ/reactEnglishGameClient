import { useEffect, useMemo, useState } from "react"
import { createPagination } from "../utils/createPagination";
import { createPages } from "../utils/createPages";
import { putElementsIntoPages } from "../utils/putElementsIntoPages";

interface Props {
    rowsPerPage: number
    kind: string
    elements: any[]
    featureState?: any
}

export type SortingWordsTypes = "" | "alphabet" | "power";

export const usePagination = ({rowsPerPage, kind, elements}: Props) => {

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pagination, setPagination]: any = useState([]);
    const [rowsOnPage, setRowsOnPage] = useState([]);
    const [sort, setSort]: [SortingWordsTypes, Function] = useState("");


    const {pages, requiredPagesNr} = useMemo(() => {

        const requiredPagesNr = Math.ceil(elements.length/rowsPerPage);
        const pages = createPages(requiredPagesNr);

        putElementsIntoPages(pages, rowsPerPage, elements, kind);

        return {pages, requiredPagesNr}

    }, [elements]);



    useEffect(() => {

        const switchPage = (pageNr: number) => setCurrentPageIndex(pageNr);
        const pagination = createPagination(requiredPagesNr, switchPage);
        setPagination(pagination);

        if (sort && sort === "alphabet") pages[currentPageIndex].rows.sort((row1: any, row2: any) => row1.word.name.localeCompare(row2.word.name));
        if (sort && sort === "power") pages[currentPageIndex].rows.sort((row1: any, row2: any) => row1.word.power - row2.word.power);

        setRowsOnPage(pages[currentPageIndex].rows);

    }, [currentPageIndex, sort, elements]);


    return {pagination, rowsOnPage, currentPageIndex, setSort, sort, pages}

}