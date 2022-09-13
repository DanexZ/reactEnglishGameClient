import { useContext, useEffect, useRef, useState } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import { ANIMATIONS } from "../data/constants";

export const useTalkingContainer = (showImmediately: boolean) => {

    const appState = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);

    const refs = {
        talkingContainerRef: useRef<HTMLDivElement>(null!),
        talkingAreaRef: useRef<HTMLDivElement>(null!),
        rootaSentenceRef: useRef<HTMLDivElement>(null!),
        forwardBtnRef: useRef<HTMLDivElement>(null!),
        finishBtnRef: useRef<HTMLDivElement>(null!),
        exitRef: useRef<HTMLDivElement>(null!)
    }

    const [rootaSentence, setRootaSentence] = useState("");


    useEffect(() => {

        const talkingContainerOff = () => {

            refs.rootaSentenceRef.current.innerText = "";
            refs.talkingAreaRef.current.classList.remove("width");
            
            setTimeout(() => {
                refs.talkingAreaRef.current.classList.remove("height");
            }, 300);

            setTimeout(() => {
                if(!refs.talkingContainerRef.current.classList.contains("hidden")) refs.talkingContainerRef.current.classList.add("hidden");
            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
        }

        const talkingContainerOn = () => {

            refs.talkingContainerRef.current.classList.remove("hidden");
            if(!refs.talkingAreaRef.current.classList.contains("height")) refs.talkingAreaRef.current.classList.add("height");
            
            setTimeout(() => {
                if(!refs.talkingAreaRef.current.classList.contains("width")) refs.talkingAreaRef.current.classList.add("width");
            }, 200);

            if (!showImmediately) {
                setTimeout(() => {
                    refs.exitRef.current.classList.remove("hidden");
                }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
            }
        }


        if(appState.showTalkingContainer) {
            talkingContainerOn()
        } else {
            talkingContainerOff();
        }


    }, [appState.showTalkingContainer]);


    useEffect(() => {

        if(showImmediately) { //todo

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