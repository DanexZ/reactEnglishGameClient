export const setSpeech = () => {
    return new Promise(
        (resolve, reject) => {
            let synth = window.speechSynthesis;
            let id: any;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}
