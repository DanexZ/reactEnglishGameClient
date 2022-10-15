import { useContext } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppStateInterface } from "../data/types/AppStateInterface";
import PhrasesPageLayout from "../layouts/phrases-page-layout";
import { PaginationArgs, usePagination } from "../hooks/usePagination";

const PhrasesPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const paginationArgs: PaginationArgs = {
        rowsPerPage: 10,
        elements: appState.phrases
    }

    const {pagination, rowsOnPage, currentPageIndex}: any = usePagination(paginationArgs);


    return <PhrasesPageLayout pagination={pagination} rowsOnPage={rowsOnPage} currentPageIndex={currentPageIndex} />

}

export default PhrasesPage;