import React, { useContext, useEffect, useRef, useState } from "react";
import FixedScreenWrapper from "../../shared/FixedScreenWrapper/FixedScreenWrapper";
import { AppStateContext } from "../../../context/AppStateContext";
import { AppStateInterface } from "../../../data/types/AppStateInterface";
import { UserWord, Word } from "../../../data/models";
import "./Jigsaw.scss";

const Jigsaw = ({setIsJigsawDisplayed}: any) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const [puzzles, setPuzzles]: any = useState([]);
    const screenWrapperRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {

        const puzzles: any[] = [];

        appState.words.forEach((word: Word) => {

            let puzzleClass = "inactive";

            appState.user.words.forEach((userWord: UserWord) => {
                if (userWord.word_id === word.id) puzzleClass = "";
            });

            puzzles.push(
                <div key={word.name} className={`puzzle ${puzzleClass}`}>
                    <div className="joint jointRight"></div>
                </div>
            );
        });

        setPuzzles(puzzles);

    }, []);



    useEffect(() => {

        if (puzzles.length) screenWrapperRef.current.style.opacity = "1";

    }, [puzzles]);



    return (
        <FixedScreenWrapper refs={screenWrapperRef} additionalClasses="jigsawWrapper">
            <span className="exit" onClick={() => setIsJigsawDisplayed(false)}>X</span>

            <h2>Reveals the picture by collecting words</h2>
            
            <div className="jigsaw">{puzzles}</div>
        
        </FixedScreenWrapper>
    )
}

export default Jigsaw