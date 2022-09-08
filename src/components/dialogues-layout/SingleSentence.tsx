import React from "react";

interface Props {
    userSpeechRef: any
    textColor: string
    text: string
}

const SingleSentence = ({userSpeechRef, textColor, text}: Props) => {

    return (
        <div className="singleDialogueContent">
            <span style={{color: textColor}}>{text}</span>
            <div ref={userSpeechRef} className="newTranscript grey_text"></div>
        </div>
    )
}

export default SingleSentence