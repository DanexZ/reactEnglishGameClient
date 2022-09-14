import React from "react";
import { Mic } from "react-ionicons";

const MicBtn = ({micBtnRef}: any) => {
    return (
        <button ref={micBtnRef} className="btn btn_blue">
            <Mic height={"1rem"} color={"#FFF"} style={{ verticalAlign: 'middle' }} />
        </button>
    )
}

export default MicBtn