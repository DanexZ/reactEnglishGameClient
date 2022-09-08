import React, { FC } from "react";
import { Mic, VolumeHigh } from "react-ionicons";
import FixedScreenWrapper from "../shared/FixedScreenWrapper/FixedScreenWrapper";
import Transcriptions from "../shared/Transcriptions";
import TransparentBox from "../shared/TransparentBox/TransparentBox";
import { UserWord } from "../../data/models";

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
            <TransparentBox exitFn={exitFn} extraClass="biggerBox">
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

                    <button className="btn btn_blue" onClick={() => speakFn()}>
                        <Mic color={"#FFF"} style={{ verticalAlign: 'middle' }} />
                    </button>

                    <button ref={micBtnRef} className="btn btn_blue">
                        <VolumeHigh color={"#FFF"} style={{ verticalAlign: 'middle' }} />
                    </button>

                </div>
            </TransparentBox>
        </FixedScreenWrapper>
    )
}


export default SingleWordBox