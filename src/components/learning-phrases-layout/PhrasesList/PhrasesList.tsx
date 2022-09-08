import React from "react";
import PhraseRow from "../PhraseRow/PhraseRow";


const PhrasesList = ({rowsOnPage}: {rowsOnPage: any}) => {

    return (
        <ul>
            {rowsOnPage.map((row: any) => <PhraseRow key={`${row.phrase.name}element`}  phrase={row.phrase} />)}
        </ul>
    )
}

export default PhrasesList