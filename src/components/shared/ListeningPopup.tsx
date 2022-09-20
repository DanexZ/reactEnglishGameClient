import React, { FC, useContext } from "react";
import { WordsPageStateContext } from "../../context/WordsPageStateContext";
import { UserWord } from "../../data/models";
import { WordsPageState } from "../../data/types/WordsPageState";
import FixedScreenWrapper from "./FixedScreenWrapper/FixedScreenWrapper";
import Transcriptions from "./Transcriptions";
import TransparentBox from "./TransparentBox/TransparentBox";

export interface ListeningProps {
    currentWord: UserWord
    exitFn: Function
    wordIndex: number
} 

const ListeningPopup: FC<ListeningProps> = ({currentWord, exitFn, wordIndex}) => {

    const featureState: WordsPageState = useContext(WordsPageStateContext);

    return (
        <FixedScreenWrapper>
            <TransparentBox extraClass="biggerBox" exitFn={exitFn}>
                <h2>This is listening mode</h2>

                <div style={{ textAlign: "center"}}>
                    <img src="/images/headphones.png" alt="boy with headphones" style={{width: "40%"}} />
                    
                    {currentWord && 

                    <div style={{color: "white", fontWeight: "bold", marginTop: "1rem"}}>

                        <strong>{wordIndex+1}/{featureState.learningWords.length}</strong>

                        <div>{currentWord.name}</div>
                        <div><Transcriptions translations={currentWord.translations} /></div>
                    </div>}
                </div>
            </TransparentBox>
        </FixedScreenWrapper>
    )
}

export default ListeningPopup