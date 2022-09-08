import React, { useContext } from "react";
import WordsPageStateContext from "../../context/WordsPageStateContext";
import { UserWord } from "../../data/models";
import WordsPageState from "../../data/types/WordsPageState";
import { SingleWordRow } from "./SingleWordRow";

const WordsList = ({rowsOnPage}: any) => {

    const featureState: WordsPageState = useContext(WordsPageStateContext);

    return (
        <ul>
            {rowsOnPage.map((row:any, index: number) => {
                return (
                    <SingleWordRow 
                        key={`${row.name}${index}`}
                        userWord={row.word}
                        cssClass="static"
                        isAdded={ (featureState.learningWords.find((word: UserWord) => word.word_id === row.word.word_id)) ? true : false }
                    />
                )
            })}
        </ul>
    )
}

export default WordsList