import React from "react";
import "./Tile3d.scss";

const Tile3d = ({onClickFn, cssClass, children}: {onClickFn?: Function, cssClass: string, children: any}) => {

    return (
        <div className="scene" onClick={(onClickFn) ? () => onClickFn() : () => {}}>
            <div className={`tile-3d ${cssClass}`}>
                <div className="wall front">
                    {children}
                </div>
                <div className="wall back"></div>
                <div className="wall left"></div>
                <div className="wall right"></div>
                <div className="wall top"></div>
                <div className="wall bottom"></div>
            </div>
        </div>
    )
}

export default Tile3d