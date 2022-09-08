import React from "react";
import "./TalkingContainer.scss";

interface Props {
    refs: {
        talkingContainerRef: any,
        talkingAreaRef: any,
        rootaSentenceRef: any,
        forwardBtnRef: any,
        finishBtnRef: any,
        exitRef: any  
    }
    rootaSentence: string
}


const TalkingContainer = (props: Props) => {

    return (
        <div ref={props.refs.talkingContainerRef} id="talkingContainer">
            <div ref={props.refs.talkingAreaRef} id="talkingArea">
                <span ref={props.refs.exitRef} className="exit hidden">x</span>
                <div ref={props.refs.rootaSentenceRef}>{props.rootaSentence}</div>
                <div id="whatMean"></div>
                <div id="userTalk"></div>
                <div id="process">
                    <div ref={props.refs.forwardBtnRef} id="forward" className="hidden"></div>
                    <div ref={props.refs.finishBtnRef} id="finish" className="hidden"></div>
                </div>
            </div>
        </div>
    )
}

export default TalkingContainer