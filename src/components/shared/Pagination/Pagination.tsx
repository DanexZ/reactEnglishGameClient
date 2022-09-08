import React from "react";
import "./Pagination.scss";

const Pagination = ({pagination, currentPageIndex}: any) => {

    return (
        <div className="pagination">

            {pagination.map((switcher: any, index: number) => {
                return (
                    <div 
                        key={`s${index}`} 
                        className={`pill ${ (currentPageIndex === index) ? "active" : ""}`} 
                        onClick={switcher.onClickFn}
                    >
                        {index+1}
                    </div>
                )
            })}
            
        </div>
    )
}

export default Pagination