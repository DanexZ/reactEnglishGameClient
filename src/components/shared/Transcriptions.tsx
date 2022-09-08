import React from "react";
import { Translation } from "../../data/models";

const Transcriptions = ({translations}: {translations: Translation[]}) => {
    
    return (
        <React.Fragment>
            {translations.map((t: Translation, i: number) => <span key={`${t.polish}${i}`} className="transcription">{t.polish}</span>)}
        </React.Fragment>
    )
        
}

export default Transcriptions