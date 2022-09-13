import React, { useContext, useEffect, useState } from "react";
import { AppStateInterface } from "../../data/types/AppStateInterface";
import { AppStateContext } from "../../context/AppStateContext";
import { AppDispatchContext } from "../../context/AppDispatchContext";
import { AppAction } from "../../data/actions/AppAction";
import { SortingWordsTypes } from "../../hooks/usePagination";
import { WordsPageAction } from "../../data/actions/WordsPageAction";
import { WordsPageDispatchContext } from "../../context/WordsPageDispatchContext";
import { WordsPageState } from "../../data/types/WordsPageState";
import { WordsPageStateContext } from "../../context/WordsPageStateContext";
import { UserWord } from "../../data/models";
import { WordsFeatureMode } from "../../data/types/WordsFeatureMode";

interface Props {
    setSort: Function
    pages: any[]
}

const WordsPageDashboard = ({setSort, pages}: Props) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);
    const featureDispatch: Function = useContext(WordsPageDispatchContext);

    const [selectSortType, setSelectSortType]: [SortingWordsTypes, Function] = useState("");
    const [mode, setMode]: [WordsFeatureMode, Function] = useState('speaking');


    const handleSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectSortType(e.target.value);
        setSort(e.target.value);
    }



    const updateInputChosenWords = (nr: number) => {
        const action: WordsPageAction = {type: "setInputChosenWords", payload: Number(nr)}
        featureDispatch(action);
    } 



    const activateListening = () => {
        const action: AppAction = {type: "activateListeningFeature"}
        appDispatch(action);
    }


    const activateSpeaking = () => {
        const action: AppAction = {type: "activateSpeakingFeature"}
        appDispatch(action);
    }


    const listeningRepetitionsHandler = (nr: number) => {
        const featureAction: WordsPageAction = {type: "setListeningRepetitions", payload: nr}
        featureDispatch(featureAction);
    }



    useEffect(() => {

        const chosenWords: UserWord[] = [...featureState.learningWords];

        const diff = featureState.inputChosenWords - featureState.learningWords.length;

        if (diff < 0) {
            chosenWords.splice(chosenWords.length + diff, -diff);

        } else {

            for (let i=0; i<pages.length; i++) {
                const {rows} = pages[i];
    
                if (chosenWords.length >= featureState.inputChosenWords) break;
    
                for (let m=0; m<rows.length; m++) {
                    const {word} = rows[m];
    
                    if (!chosenWords.some((w: UserWord) => w.word_id === word.word_id )) chosenWords.push(word);
                    if (chosenWords.length >= featureState.inputChosenWords) break
                }
            }
        }
        
        
        const featureAction: WordsPageAction = {type: "setLearningWords", payload: chosenWords}
        featureDispatch(featureAction);

    }, [featureState.inputChosenWords]);




    useEffect(() => {

        if (featureState.inputChosenWords !== featureState.learningWords.length) updateInputChosenWords(featureState.learningWords.length);

    }, [featureState.learningWords]);




    return (
        <div className="blueBar between">
            <div>
                <div className="flex column">
                    <div className="flex">
                        Chosen words: 
                            
                        <input type="number" 
                            className="wordsCountInput"
                            min="0" 
                            max={appState.user.words.length} 
                            value={featureState.inputChosenWords} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateInputChosenWords(Number(e.target.value))} 
                        />
                    </div>
                

                    {mode !== 'speaking' &&
                        <div className="buttons">
                            <div className="flex">
                            Repetitions: 
                            
                            <input type="number" 
                                className="wordsCountInput"
                                min="1" 
                                max="100" 
                                value={featureState.listeningRepetitions} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => listeningRepetitionsHandler(Number(e.target.value))} 
                            />
                        </div>
                    </div>}
                </div>

                <div className="buttons">

                    {mode === 'speaking' && 
                        <button className="btn btn-sm btn-blue" onClick={() => setMode("listening")}>
                            Speaking 
                            {appState.tutorialStage === 5 && <img className="arrow arrowBottom" src="/images/arrow-down.png" />}
                        </button>}
                    
                    {mode !== 'speaking' && 
                        <button className="btn btn-sm btn-blue" onClick={() => setMode("speaking")}>Listening</button>}


                    <button className="btn btn-sm btn-blue" onClick={() => {

                        if (mode !== "speaking") return activateListening();
                        if (mode === "speaking") return activateSpeaking();

                    }}>START</button>

                </div>
            </div>

            <div>
                <div className="flex">
                    <div className="hideOnM">Sort by: </div>
                    <select onChange={handleSelectSort} value={selectSortType}>
                        <option value=""></option>
                        <option value="alphabet">Alphabet</option>
                        <option value="power">Efficiency</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default WordsPageDashboard