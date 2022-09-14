import React, { FC } from "react";
import { Mic, VolumeHigh } from "react-ionicons";
import FixedScreenWrapper from "../shared/FixedScreenWrapper/FixedScreenWrapper";
import Transcriptions from "../shared/Transcriptions";
import TransparentBox from "../shared/TransparentBox/TransparentBox";
import { UserWord } from "../../data/models";
import Popup from "../shared/Popup/Popup";

interface SingleWordProps {
    exitFn: Function
    speakFn: Function
    word: UserWord
    micBtnRef: any
    userSpeech: string
}

const SingleWordBox: FC<SingleWordProps> = ({exitFn, word, speakFn, micBtnRef, userSpeech}) => {

    return (
        <FixedScreenWrapper>
            <Popup>
                <TransparentBox exitFn={exitFn}>
                    <h2>{word.name}</h2>

                    <div className="flex">
                        <div className="userStatements">
                            {userSpeech}
                        </div>

                        <div className="wordTranscriptions">
                            <Transcriptions translations={word.translations} />
                        </div>
                    </div>

                    <div className="buttons">

                        <button className="btn" onClick={() => speakFn()}>
                            <Mic height={"1rem"} color={"#FFF"} style={{ verticalAlign: 'middle' }} />
                        </button>

                        <button ref={micBtnRef} className="btn">
                            <VolumeHigh height={"1rem"} color={"#FFF"} style={{ verticalAlign: 'middle' }} />
                        </button>

                    </div>
                </TransparentBox>
            </Popup>
        </FixedScreenWrapper>
    )
}


export default SingleWordBox