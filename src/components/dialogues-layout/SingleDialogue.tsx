import React, { useContext } from "react";
import { AppDispatchContext } from "../../context/AppDispatchContext";
import { AppAction } from "../../data/actions/AppAction";

interface Props {
    elementIndex: number,
    title: string
}

export const SingleDialogue = ({elementIndex, title}: Props) => {

    const appDispatch = useContext(AppDispatchContext);

    const setDialogue = (dialogue_nr: number) => {
        const action: AppAction = {type: "setChosenDialogue", payload: dialogue_nr}
        appDispatch(action)
    }


    return (
        <div className="elementRow">
            <div>
                <span className="rowNumber">{elementIndex+1}</span>
                <button className="btn btn_blue" onClick={() => setDialogue(elementIndex+1)}>START</button>
                <div className="title">{title}</div>
            </div>
        </div>
    )
}