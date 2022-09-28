import { useContext } from "react";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { useLiveValidation } from "../hooks/useLiveValidation";
import { updateState } from "../utils/updateState";
import Alert from "../lib/Alert";
import { addAsyncUserCustomWord } from "../lib/api";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import { AppAction } from "../data/actions/AppAction";
import { AppDispatchContext } from "../context/AppDispatchContext";
import WordsSubMenu from "../components/learning-words-layout/WordsSubMenu";
import { UserWord } from "../data/models";
import { useWord } from "../hooks/inputs/useWord";
import { useTranslations } from "../hooks/inputs/useTranslations";

const AddWordPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const word = useWord(appState.user.id, appState.user.token);
    const translations = useTranslations();

    const { getFormErrors } = useLiveValidation({ word, translations });


    const handleSubmit = () => {

        const errors = getFormErrors();

        if (!errors.length) {

            addAsyncUserCustomWord(appState.user.id, word.state.value, translations.state.value, appState.user.token, {

                next: (data: any) => {

                    if (data.word_id) {

                        const addedWord: UserWord = {
                            initialIndex: appState.user.words.length,
                            featureInitialIndex: 0,
                            word_id: data.word_id,
                            name: word.state.value,
                            mistakes: [],
                            correctnesses: [],
                            power: 100,
                            currentlyLearning: "false",
                            created_at: data.created_at,
                            translations: translations.state.value.split(",").map((t) => { 
                                return { polish: t }
                            })
                        }

                        const action: AppAction = { type: "setUserCustomWords", payload: [...appState.user.customWords, addedWord]}
                        appDispatch(action);

                        return new Alert("success", "Słówko zapisane");
                    }

                    if (data.error) new Alert("error", data.error);
                }
            })    
            
        }

    }


    return (
        <SinglePageWrapper>
            <WordsSubMenu />

            <TransparentBox extraClass="noPopup">

                <h3>New custom word</h3>
                
                <div className="inputBox">
                    <div ref={word.state.errorRef} className="alert alert-danger small liveValidateMessage">{word.state.error}</div>
                    <input 
                        type="text"
                        ref={word.state.ref}
                        value={word.state.value} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(word.setState, "value", e.target.value)}
                        required 
                    />
                    <label>Word</label>
                </div>
                <div className="inputBox">
                    <div ref={translations.state.errorRef} className="alert alert-danger small liveValidateMessage">{translations.state.error}</div>
                    <textarea 
                        ref={translations.state.ref}
                        value={translations.state.value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateState(translations.setState, "value", e.target.value)}
                    ></textarea>
                    <label>Translations (use commas for separation)</label>
                </div>
                <button className="btn btn_blue" onClick={handleSubmit} >Save</button>

            </TransparentBox>
        </SinglePageWrapper>
    )
}

export default AddWordPage