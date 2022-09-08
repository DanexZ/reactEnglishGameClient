import { useEffect, useState, useRef, useContext } from "react";
import AppDispatchContext from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import { LANGS } from "../data/constants";
export const useSpeechRecognition = () => {

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const [recognition]: any = useState(new SpeechRecognition());
    const [userSpeech, setUserSpeech] = useState('');
    const [finalTranscript, setFinalTranscript]: [string, Function] = useState('');
    const appDispatch: Function = useContext(AppDispatchContext)
    

    const micBtnRef = useRef<HTMLButtonElement>(null!);
    
    useEffect(() => {

        recognition.lang = LANGS.US;
        recognition.continuous = true;
        recognition.interimResults = true;

        if (micBtnRef.current) micBtnRef.current.onclick = () => recognition.start();

        recognition.onstart = () => (micBtnRef.current) ? micBtnRef.current.onclick = () => recognition.stop() : null
        recognition.onend = () => (micBtnRef.current) ? micBtnRef.current.onclick = () => recognition.start(): null
            

        recognition.onresult = (e: any) => {

            setFinalTranscript('');
            let interimTranscripts = '';
    
            for (let i=e.resultIndex; i<e.results.length; i++) {

                let transcript = e.results[i][0].transcript;
                transcript.replace("\n", "<br>");
    
                if (e.results[i].isFinal && (e.results[i][0].confidence > 0)) {
                    
                    setFinalTranscript(transcript);
                    setUserSpeech('');
    
                } else {
                    interimTranscripts += transcript;
                    setUserSpeech(interimTranscripts);
                }
            }
        }

        const action: AppAction = {type: "setRecognitionInstance", payload: recognition}
        appDispatch(action);

    }, []);
    


    return {recognition, micBtnRef, userSpeech, finalTranscript}
}