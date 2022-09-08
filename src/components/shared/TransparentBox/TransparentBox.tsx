import React from "react";
import "./TransparentBox.scss";

interface Props {
    children: any
    exitFn?: Function
    extraClass?: string,
    refs?: any
}

const TransparentBox = ({children, exitFn, extraClass, refs}: Props) => {
    return (
        <div ref={(refs) ? refs : null} className={`transparentBox${(extraClass) ? ` ${extraClass}` : ""}`}>
            {exitFn && <div className="exit" onClick={() => exitFn()}>x</div>}
            {children}
        </div>
    )
}
        
export default TransparentBox