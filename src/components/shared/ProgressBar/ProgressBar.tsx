import React from "react";
import "./ProgressBar.scss";

export const ProgressBar = ({progress, label}: {progress: number | string, label: string}) => {

    return (
        <div className="progress-wrapper">
            <div className="progress flex">
                <div className={`progress-inner`} style={{width: `${progress}%`}}></div>
                <div className="progress-string">{label}</div>
            </div>
        </div>
    )
}