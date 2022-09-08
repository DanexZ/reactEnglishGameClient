import { TIMING_CALLBACKS } from "../data/constants";
import { handleRepeat } from "./handleRepeat";
import { prepareTextForProperComparing } from "./prepareTextToProperComparing";
import { trainSentences } from "./trainSentences";

export const listenSentence = (listenData: any) => {

    let sentenceIndex = listenData.sentenceIndex;

    if ((listenData.featureStage === 2 || listenData.featureStage === 3) && listenData.sentenceIndex > 0) {
        sentenceIndex++;
    }

    let currentSentence = listenData.sentences[sentenceIndex];
    let currentUserSpeech = (currentSentence) ? listenData.userSpeechRefs[currentSentence.id].current : {};

    currentSentence = prepareTextForProperComparing(currentSentence.name);


    listenData.recognition.onresult = (e: any) => {

        let interimTranscripts = '';

        for(let i = e.resultIndex; i < e.results.length; i++){
            let transcript = e.results[i][0].transcript;
            transcript.replace("\n", "<br>");

            if(e.results[i].isFinal && (e.results[i][0].confidence > 0)){
                
                let finalTranscripts = '';
                finalTranscripts += transcript;
                currentUserSpeech.innerText =  ` ${finalTranscripts}`;

                finalTranscripts = prepareTextForProperComparing(finalTranscripts);

                listenData.onstop = null;
                listenData.recognition.stop();

                if (finalTranscripts === currentSentence) {

                    listenData.sentenceIndex++
                    if ((listenData.featureStage === 3 && listenData.sentenceIndex !== 1 ) || listenData.featureStage === 2) listenData.sentenceIndex++

                    currentUserSpeech.classList.remove("grey_text");
                    currentUserSpeech.classList.add("green_text");
                    listenData.savingHandlers.savePoints(10);
                    listenData.savingHandlers.saveUserDay({points: 10});

                    if (listenData.sentenceIndex < listenData.sentences.length) {

                        if (listenData.featureStage === 1) window.scrollBy(0, currentUserSpeech.parentElement.offsetHeight);
                        if (listenData.featureStage > 1) window.scrollBy(0, currentUserSpeech.parentElement.offsetHeight * 2);

                        setTimeout(() => {
                            trainSentences(listenData);
                        }, TIMING_CALLBACKS.LISTEN_SENTENCES );


                    } else {

                        window.scrollBy(0, -currentUserSpeech.parentElement.offsetHeight * listenData.sentences.length);
                        listenData.setFeatureStage((prevStage: number) => prevStage + 1);
                        listenData.dialogueLoop();
                    }


                } else {
                   
                    const callback = () => listenSentence(listenData);
                
                    handleRepeat(callback, listenData.sentences[sentenceIndex].name)
                }

            } else {
                interimTranscripts += transcript;
                currentUserSpeech.innerText = ` ${interimTranscripts}`;
            }
        }
    }



    listenData.recognition.start();
}