import React, { useContext } from "react";
import AppDispatchContext from "../../context/AppDispatchContext";
import { AppAction } from "../../data/actions/AppAction";
import { PAGES } from "../../data/constants";
import SubMenu from "../shared/SubMenu";

const WordsSubMenu = () => {

    const appDispatch = useContext(AppDispatchContext);

    const setCurrentPage = (action: AppAction) => appDispatch(action);

    return (
        <SubMenu>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.WORDS})}><div>3000</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.USER_WORDS})}><div>Custom</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.ADD_CUSTOM_WORD})}><div>Add new</div></li>
        </SubMenu>
    )
}

export default WordsSubMenu