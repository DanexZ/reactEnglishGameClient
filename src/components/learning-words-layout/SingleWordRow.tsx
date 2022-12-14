import { useContext, useState } from "react";
import { WordsPageStateContext } from "../../context/WordsPageStateContext";
import { WordsPageDispatchContext } from "../../context/WordsPageDispatchContext";
import { WordsPageState} from "../../data/types/WordsPageState";
import Tile3d from "../shared/Tile3d/Tile3d";
import { UserWord } from "../../data/models";
import { WordsPageAction } from "../../data/actions/WordsPageAction";
import Transcriptions from "../shared/Transcriptions";
import { AppStateInterface } from "../../data/types/AppStateInterface";
import { AppStateContext } from "../../context/AppStateContext";
import { AppDispatchContext } from "../../context/AppDispatchContext";
import { AppAction } from "../../data/actions/AppAction";
import { asyncToggleCurrentlyLearning, deleteAsyncWord } from "../../lib/api";
import Alert from "../../lib/Alert";
import { getProgressBarColor } from "../../utils/getProgressBarColor";
import { LearningStatus } from "../../data/types/LearningStatus";
import { useSavingHandlers } from "../../hooks/useSavingHandlers";


interface Props {
    userWord: UserWord
    isAdded: Boolean
}


export const SingleWordRow = ({userWord, isAdded}: Props) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);
    const featureDispatch: Function = useContext(WordsPageDispatchContext);

    const [trickyWord, setTrickyWord] = useState(userWord.currentlyLearning);

    const { handleError } = useSavingHandlers();


    const handleAddingWordToLearning = (e: any) => {

        if (e.target.tagName.toLowerCase() === "li") {

            if (featureState.learningWords.find((word: UserWord) => word.word_id === userWord.word_id)) {

                const words = featureState.learningWords.filter((word: UserWord) => word.word_id !== userWord.word_id) 

                const action: WordsPageAction = {type: "setLearningWords", payload: words}
                featureDispatch(action);

            } else {
        
                const action: WordsPageAction = {type: "setLearningWords", payload: [...featureState.learningWords, userWord]}
                featureDispatch(action);
            }
        }

    }


    const trainWord = () => {

        const actions: WordsPageAction[] = [
            {type: "setTrainedWord", payload: userWord},
            {type: "activeTrainWord"}
        ]

        featureDispatch(actions[0]);
        featureDispatch(actions[1]);

    }



    const handleDelete = () => {

        const userCustomWords = appState.user.customWords.filter((uw: UserWord) => uw.word_id !== userWord.word_id);

        const action: AppAction = {type: "setUserCustomWords", payload: userCustomWords}
        appDispatch(action);
        

        deleteAsyncWord(appState.user.id, userWord.word_id, appState.user.password, appState.user.token, {
            next: (data: any) => {
                if (!data.success) new Alert("error", data.error);
            }
        });
    }


    const handleToggleTricky = () => {

        const newStatus: LearningStatus = (userWord.currentlyLearning === "true") ? "false" : "true";

        const newUserWord: UserWord = {...userWord};
        newUserWord.currentlyLearning = newStatus;

        const appAction: AppAction = {type: "swapUserWord", payload: newUserWord };
        appDispatch(appAction);


        if (newStatus === "true") {

            const trickyWords: UserWord[] = [...appState.user.currentlyLearningWords, newUserWord];

            const appAction: AppAction = {type: "setUserCurrentlyLearningWords", payload: trickyWords}
            appDispatch(appAction);

        } else {

            const trickyWords: UserWord[] = appState.user.currentlyLearningWords.filter((word) => word.word_id !== userWord.word_id);

            const appAction: AppAction = {type: "setUserCurrentlyLearningWords", payload: trickyWords}
            appDispatch(appAction);
        }


        asyncToggleCurrentlyLearning(appState.user.id, userWord.word_id, newStatus, appState.user.token, {
            errorHandler: (e: any) => handleError(e)
        });


        setTrickyWord(newStatus);
        
    }



    return (
        <li className={`elementRow ${(isAdded ? "addedWord" : "")}`} onClick={handleAddingWordToLearning}>

            <div>

                <button className="btn btn-blue" onClick={handleToggleTricky}>{(trickyWord === "true" ? "Got it" : "Tricky")}</button>

                <Tile3d cssClass="static" onClickFn={trainWord} >
                    <div className="correctnesses flex">
                        <img src="images/correct.png" />
                        <span>{userWord.correctnesses.length}</span>
                    </div>

                    <div className="mistakes flex">
                        <img src="images/uncorrect.png" />
                        <span>{userWord.mistakes.length}</span>
                    </div>

                    <div className="wordName">{userWord.name}</div>

                    <div className="wordPower">{userWord.power}%</div>

                    <div className="tile-progress">
                        <div style={{width: `${userWord.power}%`, backgroundColor: `${getProgressBarColor(userWord.power)}`}}></div>
                    </div>
                </Tile3d>

                <div className="transcriptions">
                    <Transcriptions translations={userWord.translations} />
                </div>

            </div>

            {userWord.word_id > 3000 && 
                <div>
                    <button className="btn btnRed" onClick={handleDelete}>Delete</button>
                </div>}

        </li>
    )
}