import { getRandomItem } from "./getRandomItem";
import { rootaRepeatLines } from "../data/constants";
import { speak } from "./speak";

export const handleRepeat = (callback: Function, textToRepeat?: string) => {

    const rootaLine: string = getRandomItem(rootaRepeatLines);

    const speakData = {
        txtToSay: `${rootaLine}${(textToRepeat) ? ` ${textToRepeat}` : ''}`,
        callbacks: [ () => callback() ]
    }

    speak(speakData)

}