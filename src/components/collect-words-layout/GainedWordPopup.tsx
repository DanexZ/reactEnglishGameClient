import React from "react";
import FixedScreenWrapper from "../shared/FixedScreenWrapper/FixedScreenWrapper";
import Popup from "../shared/Popup/Popup";
import TransparentBox from "../shared/TransparentBox/TransparentBox";
import Tile3d from "../shared/Tile3d/Tile3d";
import { UserWord } from "../../data/models";
import { getProgressBarColor } from "../../utils/getProgressBarColor";

interface Props {
    gainedWord: UserWord
    remainingWords: number
    clickBtnFn: Function
}


const GainedWordPopup = ({gainedWord, clickBtnFn, remainingWords}: Props) => {
    return (
        <FixedScreenWrapper>
            <Popup>
                <TransparentBox>
                    <h2>You've got:</h2>

                    <div className="itemContainer">

                        <Tile3d cssClass={"dynamic"} onClickFn={() => {}} >
                            <div className="correctnesses flex">
                                <img src="images/correct.png" />
                                <span>{gainedWord.correctnesses.length}</span>
                            </div>

                            <div className="mistakes flex">
                                <img src="images/uncorrect.png" />
                                <span>{gainedWord.mistakes.length}</span>
                            </div>

                            <div className="wordName">{gainedWord.name}</div>

                            <div className="wordPower">{gainedWord.power}%</div>

                            <div className="tile-progress">
                                <div style={{width: `${gainedWord.power}%`, backgroundColor: `${ getProgressBarColor(gainedWord.power) }`}}></div>
                            </div>
                        </Tile3d>

                    </div>

                    <div className="buttons">
                        <button className="btn btn_blue" onClick={ () => clickBtnFn(remainingWords) }>OK</button>
                    </div>
                </TransparentBox>
            </Popup>
        </FixedScreenWrapper>
    )
}

export default GainedWordPopup