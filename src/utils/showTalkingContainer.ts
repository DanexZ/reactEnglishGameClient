import { talkingContainerRefs } from "../hooks/useTalkingContainer";
import { ANIMATIONS } from "../data/constants";

export const showTalkingContainer = (refs: talkingContainerRefs, enabledToStop: boolean) => {

    refs.talkingContainerRef.current.classList.remove("hidden");

    if(!refs.talkingAreaRef.current.classList.contains("height")) refs.talkingAreaRef.current.classList.add("height");
    
    setTimeout(() => {
        if(!refs.talkingAreaRef.current.classList.contains("width")) refs.talkingAreaRef.current.classList.add("width");
    }, 200);

    if (enabledToStop) {
        setTimeout(() => {
            refs.exitRef.current.classList.remove("hidden");
        }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
    }
}