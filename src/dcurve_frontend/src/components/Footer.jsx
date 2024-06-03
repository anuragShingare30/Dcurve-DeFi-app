import React from "react";
import "../index.css";

let date = new Date();
let currentDate = date.getFullYear();
function Footer(){
    
    return (
        <div className="foot">
            <h4>© {currentDate} DCURVE</h4>
        </div>
    );
}

export {Footer};