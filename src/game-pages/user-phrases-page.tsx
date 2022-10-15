import { useContext } from "react";
import { PaginationArgs, usePagination } from "../hooks/usePagination";
import { AppStateInterface } from "../data/types/AppStateInterface";
import PhrasesPageLayout from "../layouts/phrases-page-layout";
import { AppStateContext } from "../context/AppStateContext";


const UserPhrasesPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const paginationArgs: PaginationArgs = {
        rowsPerPage: 10,
        elements: appState.user.phrases
    }

    const {pagination, rowsOnPage, currentPageIndex}: any = usePagination(paginationArgs);


    return <PhrasesPageLayout pagination={pagination} rowsOnPage={rowsOnPage} currentPageIndex={currentPageIndex} />
}

export default UserPhrasesPage