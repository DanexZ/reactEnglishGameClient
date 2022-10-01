import { useContext } from "react";
import { AppDispatchContext } from "../../context/AppDispatchContext";
import { AppAction } from "../../data/actions/AppAction";
import { PAGES } from "../../data/constants";
import SubMenu from "../shared/SubMenu";

const WordsSubMenu = () => {

    const appDispatch = useContext(AppDispatchContext);
    
    const setCurrentPage = (action: AppAction) => appDispatch(action);

    return (
        <SubMenu>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.USER_WORDS})}><div>Collected</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.USER_LEARNING_WORDS})}><div>Tricky</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.USER_CUSTOM_WORDS})}><div>Custom</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.ADD_CUSTOM_WORD})}><div>Add new</div></li>
        </SubMenu>
    )
}

export default WordsSubMenu