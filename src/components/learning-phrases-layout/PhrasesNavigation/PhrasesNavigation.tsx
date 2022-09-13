import React, { useContext } from "react";
import { AppDispatchContext } from "../../../context/AppDispatchContext";
import { AppAction } from "../../../data/actions/AppAction";
import { PAGES } from "../../../data/constants";
import SubMenu from "../../shared/SubMenu";

const PhrasesNavigation = () => {

    const appDispatch = useContext(AppDispatchContext);

    const setCurrentPage = (action: AppAction) => appDispatch(action);

    return (
        <SubMenu>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.PHRASES})}><div>Common</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.USER_PHRASES})}><div>Your</div></li>
            <li onClick={() => setCurrentPage({type: "setCurrentTab", payload: PAGES.ADD_CUSTOM_PHRASE})}><div>Add new</div></li>
        </SubMenu>
    )
}

export default PhrasesNavigation