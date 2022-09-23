import { useContext, useEffect, useRef, useState } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import { ANIMATIONS } from "../data/constants";
import { showTalkingContainer } from "../utils/showTalkingContainer";
import { hideTalkingContainer } from "../utils/hideTalkingContainer";

export interface talkingContainerRefs {
    talkingContainerRef: React.MutableRefObject<HTMLDivElement>
    talkingAreaRef: React.MutableRefObject<HTMLDivElement>
    rootaSentenceRef: React.MutableRefObject<HTMLDivElement>
    forwardBtnRef: React.MutableRefObject<HTMLDivElement>
    finishBtnRef: React.MutableRefObject<HTMLDivElement>
    exitRef: React.MutableRefObject<HTMLDivElement>

}

export const useTalkingContainer = (showImmediately: boolean) => {

    const appState = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);

    const refs: talkingContainerRefs = {
        talkingContainerRef: useRef<HTMLDivElement>(null!),
        talkingAreaRef: useRef<HTMLDivElement>(null!),
        rootaSentenceRef: useRef<HTMLDivElement>(null!),
        forwardBtnRef: useRef<HTMLDivElement>(null!),
        finishBtnRef: useRef<HTMLDivElement>(null!),
        exitRef: useRef<HTMLDivElement>(null!)
    }

    const [rootaSentence, setRootaSentence] = useState("");


    useEffect(() => {

        if (appState.showTalkingContainer) showTalkingContainer(refs, !showImmediately)
            else hideTalkingContainer(refs);
        
    }, [appState.showTalkingContainer]);



    useEffect(() => {

        if (showImmediately) {

            setTimeout(() => {

                const action: AppAction = {type: "toggleTalkingContainer"}
                appDispatch(action);

            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
            
        }


        refs.exitRef.current.onclick = () => {

            const actions: AppAction[] = [
                {type: "toggleTalkingContainer"},
                {type: "setTutorialStage", payload: 0}
            ]
    
            appDispatch(actions[0])
            appDispatch(actions[1])
        }

    }, []);



    return [refs, rootaSentence, setRootaSentence];
}