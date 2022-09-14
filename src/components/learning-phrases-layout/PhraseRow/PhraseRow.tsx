import React, { useContext, useRef } from "react";
import { Mic } from "react-ionicons";
import { speak } from "../../../utils/speak";
import { SpeakJustSay } from "../../../data/types/SpeakData";
import { Phrase } from "../../../data/models";
import { deleteAsyncPhrase } from "../../../lib/api";
import { AppStateInterface } from "../../../data/types/AppStateInterface";
import { AppStateContext } from "../../../context/AppStateContext";
import Alert from "../../../lib/Alert";
import { AppAction } from "../../../data/actions/AppAction";
import { AppDispatchContext } from "../../../context/AppDispatchContext";
import "./PhrasesRow.scss";

const PhraseRow = ({phrase}: {phrase: Phrase}) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const rolledDivRef = useRef<HTMLDivElement>(null!);

    const unrollTranscription = () => {

        if(rolledDivRef.current.classList.contains("slideHide")) {
            rolledDivRef.current.style.opacity="1";
            rolledDivRef.current.classList.toggle("slideHide");
        } else {
            rolledDivRef.current.classList.toggle("slideHide");
            setTimeout(() => {
                rolledDivRef.current.style.opacity="0";
            }, 200);
        }
    }

    const handleSpeak = () => {
        const data: SpeakJustSay = {
            txtToSay: phrase.name, 
            callbacks: []
        }
        
        speak(data);
    }


    const handleDelete = () => {

        const userPhrases = appState.user.phrases.filter((p: Phrase) => p.id !== phrase.id);

        const action: AppAction = {type: "setUserPhrases", payload: userPhrases}
        appDispatch(action);
        

        deleteAsyncPhrase(appState.user.id, phrase.id, appState.user.password, appState.user.token, {
            next: (data: any) => {
                if (!data.success) new Alert("error", data.error);
            }
        });
    }


    return(
        <React.Fragment>
            <div key={`${phrase.name}element`} className="elementRow">
                <div className="phrase">{phrase.name}</div>
                <div className="buttons">
                    <button className="btn" onClick={handleSpeak}>
                        <Mic height={"1rem"} color={"#FFF"} style={{ verticalAlign: 'middle' }} />
                    </button>
                    <button className="btn" onClick={unrollTranscription}>Transcription</button>
                    {phrase.user_id !== null && <button className="btn btnRed" onClick={handleDelete}>Delete</button>} 
                </div>
            </div>

            <div key={`${phrase.name}rolled`} ref={rolledDivRef} className="rolled slideHide">
                <div>{phrase.translations[0].polish}</div>
            </div>
        </React.Fragment>
    )
}

export default PhraseRow