import React, { useContext, useEffect, useState } from "react";
import AppStateInterface from "../../data/types/AppStateInterface";
import AppStateContext from "../../context/AppStateContext";
import { createTestsRow } from "../../utils/createTestsRows";
import { useSavingHandlers } from "../../hooks/useSavingHandlers";

const TestsList = ({setChosenTest}: {setChosenTest: Function}) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const savingHandlers = useSavingHandlers();

    const [testsRows, setTestsRows]: any = useState([]);


    useEffect(() => {

        const startTest = (level: number) => savingHandlers.createTest(level);

        const rows = [];

        for (let i=3; i<=20; i++) {
            const testsRow = createTestsRow(i, appState, startTest, setChosenTest)
            rows.push(testsRow);
        }

        setTestsRows(rows)

    }, []);


    return testsRows
}

export default TestsList