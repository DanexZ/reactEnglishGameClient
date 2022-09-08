import React, { useContext, useState } from "react";
import PhrasesNavigation from "../components/learning-phrases-layout/PhrasesNavigation/PhrasesNavigation";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { useLiveValidation } from "../hooks/useLiveValidation";
import { useInitialFieldState } from "../hooks/useLiveValidation";
import { updateState } from "../utils/updateState";
import Alert from "../lib/Alert";
import { addAsyncUserPhrase } from "../lib/api";
import AppStateInterface from "../data/types/AppStateInterface";
import AppStateContext from "../context/AppStateContext";
import { Phrase } from "../data/models";
import { AppAction } from "../data/actions/AppAction";
import AppDispatchContext from "../context/AppDispatchContext";

const AddPhrasePage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const [phrase, setPhrase] = useState(useInitialFieldState());
    const [translation, setTranslation] = useState(useInitialFieldState());

    const { getFormErrors } = useLiveValidation({ 
        phrase: {
            state: phrase,
            setState: setPhrase,
            ...phrase
        },
        translation: {
            state: translation,
            setState: setTranslation,
            ...translation
        }
    });


    const handleSubmit = () => {

        const errors = getFormErrors();

        if (!errors.length) {

            addAsyncUserPhrase(appState.user.id, phrase.value, translation.value, appState.user.token, {

                next: (data: any) => {

                    if (data.phrase_id) {

                        const addedPhrase: Phrase = {
                            id: data.phrase_id,
                            user_id: appState.user.id,
                            name: phrase.value,
                            translations: [{
                                polish: translation.value,
                            }]
                        }

                        const action: AppAction = { type: "setUserPhrases", payload: [...appState.user.phrases, addedPhrase]}
                        appDispatch(action);

                        return new Alert("success", "Fraza zapisana");
                    }

                    if (data.error) new Alert("error", data.error);
                }

            }); 
        }
    }


    return (
        <SinglePageWrapper>
            <PhrasesNavigation />

            <TransparentBox extraClass="noPopup">

                <h3>New custom phrase</h3>
                <div className="inputBox">
                    <div ref={phrase.errorRef} className="alert alert-danger small liveValidateMessage">{phrase.error}</div>
                    <input 
                        type="text"
                        ref={phrase.ref}
                        value={phrase.value} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setPhrase, "value", e.target.value)}
                        required 
                    />
                    <label>Phrase</label>
                </div>
                <div className="inputBox">
                    <div ref={translation.errorRef} className="alert alert-danger small liveValidateMessage">{translation.error}</div>
                    <textarea 
                        ref={translation.ref}
                        value={translation.value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateState(setTranslation, "value", e.target.value)}
                    ></textarea>
                    <label>Translation</label>
                </div>
                <button className="btn btn_blue" onClick={handleSubmit} >Save</button>

            </TransparentBox>
        </SinglePageWrapper>
    )
}

export default AddPhrasePage