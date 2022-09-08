import React from "react";

const Tip = ({kind}: {kind: string}) => {
    return (
        <div className="bottomAdditionalBar">
            {kind === "words" && 
                <React.Fragment>
                    <h3>You do not have any words yet</h3>
                    <h3>Go to the COLLECT page</h3>
                </React.Fragment>}
        </div>
    )
}

export default Tip