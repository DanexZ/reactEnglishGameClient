import { useContext } from "react";
import { WordsPageStateContext } from "../../context/WordsPageStateContext";
import { UserWord } from "../../data/models";
import { PageRow } from "../../data/types/PageRow";
import { WordsPageState } from "../../data/types/WordsPageState";
import { SingleWordRow } from "./SingleWordRow";

const WordsList = ({rowsOnPage}: {rowsOnPage: PageRow[]}) => {

    const featureState: WordsPageState = useContext(WordsPageStateContext);

    return (
        <ul>
            {rowsOnPage.map(({element}: {element: UserWord}, index: number) => {
                return (
                    <SingleWordRow 
                        key={`${element.name}${index}`}
                        userWord={element}
                        isAdded={ (featureState.learningWords.find((word: UserWord) => word.word_id === element.word_id)) ? true : false }
                    />
                )
            })}
        </ul>
    )
}

export default WordsList