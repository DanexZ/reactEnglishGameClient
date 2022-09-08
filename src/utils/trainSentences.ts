import { speak } from "./speak";
import { SpeakJustSay } from "../data/types/SpeakData";
import { Sentence } from "../data/models";
import { listenSentence } from "./listenSentences";

export const trainSentences = (listenData: any) => {

    let sentence: Sentence = listenData.sentences[listenData.sentenceIndex];

    if (listenData.featureStage === 3 && listenData.sentenceIndex === 0) return listenSentence(listenData);


    const speakData: SpeakJustSay = {
        txtToSay: sentence.name,
        callbacks: [ () => { 

            console.log("sentenceIndex");
            console.log(listenData.sentenceIndex)

            if (listenData.featureStage === 2 && !listenData.sentences[listenData.sentenceIndex + 1]) {

                window.scrollBy(0, -listenData.userSpeechRefs[sentence.id].current.parentElement.offsetHeight * listenData.sentences.length);
                listenData.setFeatureStage((prevStage: number) => prevStage + 1);
                return listenData.dialogueLoop()
            }

            listenSentence(listenData);
        } ]
    }

    speak(speakData);

}