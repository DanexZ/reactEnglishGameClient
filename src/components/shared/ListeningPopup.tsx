import React, { FC } from "react";
import { UserWord } from "../../data/models";
import FixedScreenWrapper from "./FixedScreenWrapper/FixedScreenWrapper";
import Transcriptions from "./Transcriptions";
import TransparentBox from "./TransparentBox/TransparentBox";

export interface ListeningProps {
    currentWord: UserWord
    exitFn: Function
} 

const ListeningPopup: FC<ListeningProps> = ({currentWord, exitFn}) => {

    return (
        <FixedScreenWrapper>
            <TransparentBox extraClass="biggerBox" exitFn={exitFn}>
                <h2>This is listening mode</h2>

                <div style={{ textAlign: "center"}}>
                    <img src="/images/headphones.png" alt="boy with headphones" style={{width: "40%"}} />
                    
                    {currentWord && 
                    <div style={{color: "white", fontWeight: "bold", marginTop: "1rem"}}>
                        <div>{currentWord.name}</div>
                        <div><Transcriptions translations={currentWord.translations} /></div>
                    </div>}
                </div>
            </TransparentBox>
        </FixedScreenWrapper>
    )
}

export default ListeningPopup