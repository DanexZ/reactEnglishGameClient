import React from "react"

const ScreenWrapper = ({children}: {children: React.ReactNode}) => {

    return (
        <React.Fragment>
            {children}
            <div className="mountains"></div>
        </React.Fragment>
    )
}

export default ScreenWrapper