import { useContext } from "react";
import WordsList from "../components/learning-words-layout/WordsList";
import WordsPageDashboard from "../components/learning-words-layout/WordsPageDashboard";
import WordsSubMenu from "../components/learning-words-layout/WordsSubMenu";
import Pagination from "../components/shared/Pagination/Pagination";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import { AppStateContext } from "../context/AppStateContext";
import { WordsPageStateContext } from "../context/WordsPageStateContext";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { WordsPageState } from "../data/types/WordsPageState";
import ListeningFeature from "../features/listening-feature";
import TrainingWordFeature from "../features/training-word-feature";
import { usePagination } from "../hooks/usePagination";

const UserTrickyWordsPage = () => {
    const appState: AppStateInterface = useContext(AppStateContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);

    const {pagination, rowsOnPage, currentPageIndex, setSort, pages}: any = usePagination({
        rowsPerPage: 30, 
        kind: "word",
        elements: appState.user.currentlyLearningWords
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

export default UserTrickyWordsPage