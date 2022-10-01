import { useContext } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { WordsPageStateContext } from "../context/WordsPageStateContext";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import WordsPageDashboard from "../components/learning-words-layout/WordsPageDashboard";
import WordsList from "../components/learning-words-layout/WordsList";
import Pagination from "../components/shared/Pagination/Pagination";
import { usePagination } from "../hooks/usePagination";
import { WordsPageState } from "../data/types/WordsPageState";
import { AppStateInterface } from "../data/types/AppStateInterface";
import ListeningFeature from "../features/listening-feature";
import TrainingWordFeature from "../features/training-word-feature";
import WordsSubMenu from "../components/learning-words-layout/WordsSubMenu";

const UserCustomWordsPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);

    const {pagination, rowsOnPage, currentPageIndex, setSort, pages} = usePagination({
        rowsPerPage: 30,
        elements: appState.user.customWords
    });



    return (
        <SinglePageWrapper additionClasses={"wordsPage"}>
            <WordsPageDashboard setSort={setSort} pages={pages} />
            <WordsSubMenu />
            {featureState.trainWord && <TrainingWordFeature />}
            <WordsList rowsOnPage={rowsOnPage} />
            <Pagination pagination={pagination} currentPageIndex={currentPageIndex} />
            {appState.listening && <ListeningFeature />}
        </SinglePageWrapper>
    )

}

export default UserCustomWordsPage