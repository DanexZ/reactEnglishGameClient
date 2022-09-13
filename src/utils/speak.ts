import { typing } from "./typing";
import { chunkTextIntoSentences } from "./chunkTextIntoSentences";
import { SOUNDS } from "../data/constants";
import { LANGS } from "../data/constants";
/* eslint-disable */
const {Howl, Howler} = require('howler');
/* eslint-enable */


export const speak = (data: any) => {

    const sentences = chunkTextIntoSentences(data.txtToSay);
    const msg = new SpeechSynthesisUtterance();
    msg.lang = data.lang || LANGS.US;
    msg.rate = 0.85;
    msg.text = sentences[0];

    const synth = window.speechSynthesis;
    synth.cancel();



    msg.onstart = () => {

        if (data.forwardBtnRef) {

            data.setRootaSentence('');
            setTimeout(() => typing(Array.from(msg.text), data.setRootaSentence), 300);
        }
    }



    msg.onend = () => {

        sentences.shift();

        const nextSentence = () => {

            if (data.forwardBtnRef) data.forwardBtnRef.current.classList.toggle("hidden");
            data.txtToSay = sentences.join("");
            
            speak(data);
            
        }

        if (sentences.length) {

            if (data.forwardBtnRef) {
                data.forwardBtnRef.current.onclick = () => nextSentence();
                data.forwardBtnRef.current.classList.remove("hidden");
                new Howl(SOUNDS.OOT_DIALOGUE_NEXT).play();

            } else {
                return nextSentence()
            }

        } else {

            if (data.forwardBtnRef) {
                data.finishBtnRef.current.onclick= () => {

                    const callback = data.callbacks[0];
                    data.callbacks.shift();
                    data.finishBtnRef.current.classList.toggle("hidden");

                    return callback();
                };
                data.finishBtnRef.current.classList.remove("hidden");
                new Howl(SOUNDS.OOT_DIALOGUE_DONE).play();

                return
            }

            const callback = data.callbacks[0];
            data.callbacks.shift();

            if (callback) callback();
        }



    }

    synth.speak(msg);

}