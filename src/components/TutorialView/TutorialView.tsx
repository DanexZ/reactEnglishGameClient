import React from "react";
import SinglePageWrapper from "../shared/SinglePageWrapper";
import "./TutorialView.scss"


export const TutorialView = ({onClickFn} : {onClickFn: any}) => {

    return (
        <SinglePageWrapper additionClasses="tutorialView">
            <h3>Sugeruję rozpocząć tutaj <br /> (tutorial wprowadzający) </h3>
            <div onClick={onClickFn}>START</div>
        </SinglePageWrapper>
    )
}