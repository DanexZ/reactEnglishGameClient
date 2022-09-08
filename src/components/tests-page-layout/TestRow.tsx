import React from "react";
import Transcriptions from "../shared/Transcriptions";
import { Translation } from "../../data/models";


interface Props {
    children: any
    translations: Translation[]
    rowIndex: number,
    word?: string
}

const TestRow = ({children, translations, rowIndex, word}: Props) => {

    return (
        <li>
            <div>
                <span className="row_nr">{rowIndex+1}</span>
                {word !== null && <span className="raisedText" style={{marginLeft: "1rem", marginRight: "1rem"}}>{word}</span>}
                <span className="transcriptions">
                    <Transcriptions translations={translations} />
                </span>
            </div>

            {children}
        </li>
    )
}

export default TestRow