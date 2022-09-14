import React, { useContext } from "react";
import { AppDispatchContext } from "../../../context/AppDispatchContext";
import { AppStateContext } from "../../../context/AppStateContext";
import { AppAction } from "../../../data/actions/AppAction";
import { SOUNDS } from "../../../data/constants";
import { AppStateInterface } from "../../../data/types/AppStateInterface";
import { SpeakJustSay } from "../../../data/types/SpeakData";
import { useSavingHandlers } from "../../../hooks/useSavingHandlers";
import { speak } from "../../../utils/speak";
import { ProgressBar } from "../../shared/ProgressBar/ProgressBar";
import "./LevelRow.scss";
const {Howl, Howler} = require('howler');


interface Props {
    level: number
    userWords: number
    requiredWords: number
    userPoints: number
    requiredPoints: number
    userEfficiency: number
    requiredEfficiency: number
    passedTests: number
    requiredTests: number
    progress: number
    progressLabel: string
    isLevelUnlocked: Boolean
    isLevelFinished: Boolean
    remainingWords: number
    setRemainingWords: Function
}

const LevelRow = (props: Props) => {

    const appDispatch: Function = useContext(AppDispatchContext);
    const appState: AppStateInterface = useContext(AppStateContext);
    const {saveUserEvent} = useSavingHandlers();

    const handleClickLevel = () => {

        const action: AppAction = {type: "setChosenLevel", payload: props.level}
        appDispatch(action);

        props.setRemainingWords(props.remainingWords)
    }


    if ((appState.user.level === props.level - 1) && props.isLevelUnlocked) {
        
        if (appState.user.events.unlockedLevels.length < props.level) {

            saveUserEvent("unlocked_level");

            new Howl(SOUNDS.OOT_SECRET_MONO).play();

            setTimeout(() => {

                const speakData: SpeakJustSay = {
                    txtToSay: `Hey, congratulations! You've unlocked new level.`,
                    callbacks: []
                }

                speak(speakData)

            }, 1000)
        }
    }


    return (
        <div className="levelRow">
            
            <span className="rowNumber">{props.level}</span>

            <div className="center">

                {!props.isLevelUnlocked &&
                    <div>Requirements:</div>
                }

                {props.isLevelUnlocked && !props.isLevelFinished &&
                    <React.Fragment>
                        <span>Level unlocked!</span> 
                        <button className="btn btn_blue" onClick={handleClickLevel}>
                            START
                            {(appState.tutorialStage === 17 && props.level === 1) && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                        </button>
                    </React.Fragment>
                }

                {props.isLevelFinished && <span>All words have been collected!</span>}
            </div>

            <div className="requirements">
                <p className="flex">
                    {`${props.userWords} / ${props.requiredWords} words`}
                    {props.userWords >= props.requiredWords && <img src="/images/correct.png" />}

                    {(appState.tutorialStage === 12 && props.level === 1) || 
                    (appState.tutorialStage === 13 && props.level === 2) &&
                    <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                </p>
                <p className="flex">
                    {`${props.userPoints} / ${props.requiredPoints} pkt`}
                    {props.userPoints >= props.requiredPoints && <img src="/images/correct.png" />}

                    {(appState.tutorialStage === 14 && props.level === 1) && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                </p>
                <p className="flex">
                    {`${props.userEfficiency}% / ${props.requiredEfficiency}%`}
                    {props.userEfficiency >= props.requiredEfficiency && <img src="/images/correct.png" />}

                    {(appState.tutorialStage === 15 && props.level === 1) && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                </p>
                <p className="flex">
                    {`${props.passedTests} / ${props.requiredTests} tests`}
                    {props.passedTests >= props.requiredTests && <img src="/images/correct.png" />}

                    {(appState.tutorialStage === 16 && props.level === 1) && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                </p>
            </div>

            <ProgressBar progress={props.progress} label={props.progressLabel} />
        </div>
    )
}

export default LevelRow