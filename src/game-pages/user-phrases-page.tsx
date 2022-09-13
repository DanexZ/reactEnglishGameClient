import React, { useContext } from "react";
import { usePagination } from "../hooks/usePagination";
import { AppStateInterface } from "../data/types/AppStateInterface";
import PhrasesPageLayout from "../layouts/phrases-page-layout";
import { AppStateContext } from "../context/AppStateContext";


const UserPhrasesPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);

    const {pagination, rowsOnPage, currentPageIndex}: any = usePagination({
        rowsPerPage: 10, 
        kind: "phrase",
        elements: appState.user.phrases

    });


    return <PhrasesPageLayout pagination={pagination} rowsOnPage={rowsOnPage} currentPageIndex={currentPageIndex} />
}

export default UserPhrasesPage