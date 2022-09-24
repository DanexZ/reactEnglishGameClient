import { useContext } from "react";
import PhrasesNavigation from "../components/learning-phrases-layout/PhrasesNavigation/PhrasesNavigation";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { useLiveValidation } from "../hooks/useLiveValidation";
import { updateState } from "../utils/updateState";
import Alert from "../lib/Alert";
import { addAsyncUserPhrase } from "../lib/api";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import { Phrase } from "../data/models";
import { AppAction } from "../data/actions/AppAction";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { usePhrase } from "../hooks/inputs/usePhrase";
import { useTranslations } from "../hooks/inputs/useTranslations";

const AddPhrasePage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const phrase = usePhrase(appState.user.id, appState.user.token);
    const translations = useTranslations();

    const { getFormErrors } = useLiveValidation({ phrase, translations});


    const handleSubmit = () => {

        const errors = getFormErrors();

        if (!errors.length) {

            addAsyncUserPhrase(appState.user.id, phrase.state.value, translations.state.value, appState.user.token, {

                next: (data: any) => {

                    if (data.phrase_id) {

                        const addedPhrase: Phrase = {
                            id: data.phrase_id,
                            user_id: appState.user.id,
                            name: phrase.state.value,
                            translations: [{
                                polish: translations.state.value,
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
                    <div ref={phrase.state.errorRef} className="alert alert-danger small liveValidateMessage">{phrase.state.error}</div>
                    <input 
                        type="text"
                        ref={phrase.state.ref}
                        value={phrase.state.value} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(phrase.setState, "value", e.target.value)}
                        required 
                    />
                    <label>Phrase</label>
                </div>
                <div className="inputBox">
                    <div ref={translations.state.errorRef} className="alert alert-danger small liveValidateMessage">{translations.state.error}</div>
                    <textarea 
                        ref={translations.state.ref}
                        value={translations.state.value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateState(translations.setState, "value", e.target.value)}
                    ></textarea>
                    <label>Translation</label>
                </div>
                <button className="btn btn_blue" onClick={handleSubmit} >Save</button>

            </TransparentBox>
        </SinglePageWrapper>
    )
}

export default AddPhrasePage