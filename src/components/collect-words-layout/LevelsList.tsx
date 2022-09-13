import React, { useContext, useEffect, useState } from "react";
import { AppStateInterface } from "../../data/types/AppStateInterface";
import { AppStateContext } from "../../context/AppStateContext";
import { createLevelsRow } from "../../utils/createLevelsRow";
import SinglePageWrapper from "../shared/SinglePageWrapper";

const LevelsList = ({setRemainingWords}: {setRemainingWords: Function}) => {

    const appState: AppStateInterface = useContext(AppStateContext);

    const [levelRows, setLevelRows]: any = useState([]);

    useEffect(() => {

        const levels = [];

        for(let i=1; i<=20; i++) {
            const levelRow = createLevelsRow(i, appState, setRemainingWords)
            levels.push(levelRow);
        }

        setLevelRows(levels)

    }, []) 

    return (
        <SinglePageWrapper>
            {levelRows}
        </SinglePageWrapper>
    )
}

export default LevelsList