import React from "react";
import "../index.css";
import { BorderBottom, Height, Padding } from "@mui/icons-material";

let margin = {
    margin:"0px",
    marginLeft:"30px" 
};
let box = {
    border:"1px solid white",
    boxShadow:"3px 2px 0px 0px blue"
} 
let color = {
    color:"grey"
}
function Head(){

    return (
        <div className="header">
            {/* <div className="info">
                <ul className="nav_list">
                    <li><span style={color}>Total Deposit:</span> $2,231,531,022</li>
                    <li><span style={color}>Daily Volume:</span> $316,979,730</li>
                    <li><span style={color}>Crypto Volume Share:</span> 5.65%</li>
                </ul>
            </div> */}
            <div className="headInfo">
                <h1 style={margin}>Motoko</h1>
                <ul className="nav_list">
                        <li>DASHBOARD</li>
                <li style={box}><span><img src="./load.svg"/></span>CONNECT WALLET</li>
                </ul>
            </div>
            
        </div>
    );
};

export {Head};