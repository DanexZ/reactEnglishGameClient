import { Phrase } from "../../../data/models";
import { PageRow } from "../../../data/types/PageRow";
import PhraseRow from "../PhraseRow/PhraseRow";


const PhrasesList = ({rowsOnPage}: {rowsOnPage: PageRow[]}) => {

    return (
        <ul>
            {rowsOnPage.map(({element}: {element: Phrase}) => <PhraseRow key={`${element.name}element`}  phrase={element} />)}
        </ul>
    )
}

export default PhrasesList