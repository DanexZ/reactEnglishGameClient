import React, { useState } from "react";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import { MusicalNotes, Mail } from "react-ionicons";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";

const PreferencesPage = () => {

    const [musicChecked, setMusicChecked] = useState(true);
    const [emailsChecked, setEmailsChecked] = useState(true);

    const switchMusic = () => setMusicChecked(prev => !prev);
    const switchEmails = () => setEmailsChecked(prev => !prev);
    


    return (
        <SinglePageWrapper>
            <div className="blueBar flex raisedText">Your preferences</div>

            <TransparentBox extraClass="noPopup">
                <ul className="settingsRows">
                    <li className="settingsRow">

                        <MusicalNotes 
                            color={"#FFF"}
                            width="20px"
                            height="20px" 
                            style={{ verticalAlign: 'middle' }}
                        />
                        
                        <div className="singleSetting">
                            <p className="flex">Muzyka</p>
                            <input type="checkbox" className="darkCheckbox" onChange={switchMusic} checked={musicChecked} />
                        </div>
                    </li>
                    <li className="settingsRow">

                        <Mail 
                            color={"#FFF"}
                            width="22px"
                            height="22px" 
                            style={{ verticalAlign: 'middle' }}
                        />

                        <div className="singleSetting">
                            <p className="flex">E-maile z problematycznymi słówkami</p>
                            <input type="checkbox" className="darkCheckbox" value="on" onChange={switchEmails} checked={emailsChecked} />
                        </div>
                    </li>
                </ul>
            </TransparentBox>

        </SinglePageWrapper>
    )
}

export default PreferencesPage