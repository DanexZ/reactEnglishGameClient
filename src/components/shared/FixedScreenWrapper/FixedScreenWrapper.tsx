import React from "react";
import "./FixedScreenWrapper.scss"

const FixedScreenWrapper = ({children, additionalClasses, refs}: {children: any, additionalClasses?: string, refs?: any}) => {
    return (
        <div ref={refs} className={`fixedScreenWrapper${(additionalClasses ? ` ${additionalClasses}` : "")}`}>
            {children}
        </div>
    )
}

export default FixedScreenWrapper