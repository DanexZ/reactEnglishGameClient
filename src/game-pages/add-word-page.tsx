import React, { useContext, useState } from "react";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { useLiveValidation } from "../hooks/useLiveValidation";
import { useInitialFieldState } from "../hooks/useLiveValidation";
import { updateState } from "../utils/updateState";
import Alert from "../lib/Alert";
import { addAsyncUserCustomWord } from "../lib/api";
import AppStateInterface from "../data/types/AppStateInterface";
import AppStateContext from "../context/AppStateContext";
import { AppAction } from "../data/actions/AppAction";
import AppDispatchContext from "../context/AppDispatchContext";
import WordsSubMenu from "../components/learning-words-layout/WordsSubMenu";
import { UserWord } from "../data/models";

const AddWordPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const [word, setWord] = useState(useInitialFieldState());
    const [translations, setTranslations] = useState(useInitialFieldState());

    const { getFormErrors } = useLiveValidation({ 
        word: {
            state: word,
            setState: setWord,
            ...word
        },
        translations: {
            state: translations,
            setState: setTranslations,
            ...translations
        }
    });


    const handleSubmit = () => {

        const errors = getFormErrors();

        if (!errors.length) {

            addAsyncUserCustomWord(appState.user.id, word.value, translations.value, appState.user.token, {

                next: (data: any) => {

                    if (data.word_id) {

                        const addedWord: UserWord = {
                            initialIndex: appState.user.words.length,
                            featureInitialIndex: 0,
                            word_id: data.word_id,
                            name: word.value,
                            mistakes: [],
                            correctnesses: [],
                            power: 100,
                            created_at: data.created_at,
                            translations: translations.value.split(",").map((t) => { 
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
                    <div ref={word.errorRef} className="alert alert-danger small liveValidateMessage">{word.error}</div>
                    <input 
                        type="text"
                        ref={word.ref}
                        value={word.value} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setWord, "value", e.target.value)}
                        required 
                    />
                    <label>Word</label>
                </div>
                <div className="inputBox">
                    <div ref={translations.errorRef} className="alert alert-danger small liveValidateMessage">{translations.error}</div>
                    <textarea 
                        ref={translations.ref}
                        value={translations.value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateState(setTranslations, "value", e.target.value)}
                    ></textarea>
                    <label>Translations (use commas for separation)</label>
                </div>
                <button className="btn btn_blue" onClick={handleSubmit} >Save</button>

            </TransparentBox>
        </SinglePageWrapper>
    )
}

export default AddWordPage