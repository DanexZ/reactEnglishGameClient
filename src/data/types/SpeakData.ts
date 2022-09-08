export interface SpeakJustSay {
    mode?: string
    lang?: string
    txtToSay: string,
    callbacks: Function[]
}

export interface SpeakUsingTalkingContainer extends SpeakJustSay {
    rootaSentenceRef: any,
    forwardBtnRef: any
    finishBtnRef: any,
    callbacks: Function[],
    setRootaSentence: Function
}