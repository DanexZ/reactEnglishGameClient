import React from "react";

const SubMenu = ({children}: any) => {

    return (
        <nav className="main_nav">
            <ul>
                {children}
            </ul>
        </nav>
    )
}

export default SubMenu