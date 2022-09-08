import React from "react";
import PhrasesNavigation from "../components/learning-phrases-layout/PhrasesNavigation/PhrasesNavigation";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import Pagination from "../components/shared/Pagination/Pagination";
import PhrasesList from "../components/learning-phrases-layout/PhrasesList/PhrasesList";

const PhrasesPageLayout = ({pagination, currentPageIndex, rowsOnPage}: any) => {

    return (
        <SinglePageWrapper additionClasses={"phrasesPage"}>
            <PhrasesNavigation />
            <PhrasesList rowsOnPage={rowsOnPage} />
            <Pagination pagination={pagination} currentPageIndex={currentPageIndex} />
        </SinglePageWrapper>
    )
}

export default PhrasesPageLayout