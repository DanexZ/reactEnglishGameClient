import React, { useContext } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppStateInterface } from "../data/types/AppStateInterface";
import DialogueFeature from "../features/dialogue-feature";
import { SingleDialogue } from "../components/dialogues-layout/SingleDialogue";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { Dialogue } from "../data/models";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/shared/Pagination/Pagination";

const DialoguesPage = () => {   
    
    const appState: AppStateInterface = useContext(AppStateContext);
    const {recognition, micBtnRef} = useSpeechRecognition();

    const {pagination, rowsOnPage, currentPageIndex}: any = usePagination({
        rowsPerPage: 10, 
        kind: "dialogue",
        elements: appState.dialogues

    });


    if (appState.user.level < 2) {
        return (
            <SinglePageWrapper additionClasses="blueBar">
                <h3>Want dialogues?<br/>Reach 2 level to unlock this section.</h3>
            </SinglePageWrapper>
        )
    }

    return (
        <SinglePageWrapper additionClasses="dialoguesPage">
            {appState.chosenDialogue > 0 && <DialogueFeature recognition={recognition} micBtnRef={micBtnRef} />} 
            {appState.chosenDialogue === 0 && rowsOnPage.map(({dialogue, elementIndex}: {dialogue: Dialogue, elementIndex: number}) => <SingleDialogue key={dialogue.name} elementIndex={elementIndex} title={dialogue.name} />)}
            <Pagination pagination={pagination} currentPageIndex={currentPageIndex} />
        </SinglePageWrapper>
    )
}

export default DialoguesPage;