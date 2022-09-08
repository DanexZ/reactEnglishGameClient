import React from "react";

const AdditionalButtons = ({setIsJigsawDisplayed}: {setIsJigsawDisplayed: Function}) => {
    return (
        <div className="blueBar flex">
            <button className="btn btn_blue" onClick={() => setIsJigsawDisplayed(true)}>Secret Picture</button>
        </div>
    )
}

export default AdditionalButtons