import { talkingContainerRefs } from "../hooks/useTalkingContainer";
import { ANIMATIONS } from "../data/constants";

export const hideTalkingContainer = (refs: talkingContainerRefs) => {

    refs.rootaSentenceRef.current.innerText = "";
    refs.talkingAreaRef.current.classList.remove("width");
    
    setTimeout(() => {
        refs.talkingAreaRef.current.classList.remove("height");
    }, 300);

    setTimeout(() => {
        if(!refs.talkingContainerRef.current.classList.contains("hidden")) refs.talkingContainerRef.current.classList.add("hidden");
    }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
}