import React from "react";

const SinglePageWrapper = ({additionClasses, children}: {additionClasses?: string, children: any}) => {
    return (
        <div className={`singlePage ${additionClasses}`}>
            {children}
        </div>
    )
}

export default SinglePageWrapper