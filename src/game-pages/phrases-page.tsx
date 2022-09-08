import React, { useContext } from "react";
import AppStateContext from "../context/AppStateContext";
import AppStateInterface from "../data/types/AppStateInterface";
import PhrasesPageLayout from "../layouts/phrases-page-layout";
import { usePagination } from "../hooks/usePagination";

const PhrasesPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);

    const {pagination, rowsOnPage, currentPageIndex}: any = usePagination({
        rowsPerPage: 10, 
        kind: "phrase",
        elements: appState.phrases

    });


    return <PhrasesPageLayout pagination={pagination} rowsOnPage={rowsOnPage} currentPageIndex={currentPageIndex} />

}

export default PhrasesPage;