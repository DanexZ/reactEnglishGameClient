import React from "react";
import FixedScreenWrapper from "./shared/FixedScreenWrapper/FixedScreenWrapper";
import Popup from "./shared/Popup/Popup";
import { ProgressBar } from "./shared/ProgressBar/ProgressBar";
import TransparentBox from "./shared/TransparentBox/TransparentBox";

interface Props {
    progress: number,
    message: string
}

export const DataLoadingBox = ({progress, message}: Props) => {

    return (
        <FixedScreenWrapper>
            <Popup>
                <TransparentBox>
                    <h2>Angielski z Rutą <br/>
                        wersja <span>3.0</span>
                    </h2>
                    <ProgressBar progress={progress} label={`${progress}%`} />
                    <div className="random-message">
                        <p>Czy już wiesz?</p>
                        <p>{message}</p>
                    </div>
                </TransparentBox>
            </Popup>
        </FixedScreenWrapper>
    )
}