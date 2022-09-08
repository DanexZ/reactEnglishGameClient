import React from "react"
import TestRow from "./TestRow"
import { UserWord } from "../../data/models"

interface Props {
    word: UserWord
    rowIndex: number
    refs: any
    time: number
}

const InitialTestRow = ({word, rowIndex, refs, time}: Props) => {
    return (
        <TestRow translations={word.translations} rowIndex={rowIndex}>
            <div ref={refs[word.word_id].userSpeech} className="userSpeech"></div>

            <div className="timer flex">
                <span ref={refs[word.word_id].time} className="time">{time}</span>
                <span ref={refs[word.word_id].clock}></span>
            </div>
        </TestRow>
    )
}

export default InitialTestRow