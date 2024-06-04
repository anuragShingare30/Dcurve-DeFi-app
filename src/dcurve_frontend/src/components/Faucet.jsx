import React from "react";
import { createActor, canisterId, dcurve_backend } from "../../../declarations/dcurve_backend";
import { AuthClient } from "@dfinity/auth-client";
import "../index.css"

let style = { 
    margin:"0px"
};
let width = {
    backgroundColor:"#171718",
    width:"100%",
    padding:"10px",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    borderTopRightRadius:"20px",
    borderTopLeftRadius:"20px",
    borderBottom:"1px solid white"
}
let width1 = {
    backgroundColor:"rgba(0, 0, 0, 0.5)",
    color:"#1763fd",
    width:"100%",
    padding:"10px",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    borderBottomRightRadius:"20px",
    borderBottomLeftRadius:"20px",
}
let color = {
    color:"white"
}
function Claimfaucet(props) {

    let [disabled, setDisable] = React.useState(false);
    let [claimbtn, setClaimbtn] = React.useState("Claim your free tokens!!!");

    async function handleClick(){ 
        setDisable(true);

        var authClient = await AuthClient.create();
        var identity = authClient.getIdentity();

        var authenticatedId = createActor(canisterId, {
            agentOptions:{
                identity,
            }
        });

        var result = await authenticatedId.payOut();  
        setClaimbtn(result);
    };

    return (
        <div className="claim"> 
            <div style={width}><h1 style={style}><span><img src="claim.svg" width="30px"/></span>Faucet</h1></div>
            <div style={width1} className="claimToken">
                {/* HERE WE HAVE CREATED OUR OWN CRYPTO COIN CALLED 'DAN' */}
            <p>Claim upto 10,000 ICP tokens as reward to your wallet 🤩</p>
            <h3 style={color}>Your Wallet ID is:</h3>
            <p style={color}>{props.userId}</p>
            <p>Get your free ICP tokens here!👇</p>
            <button className="btn" onClick={handleClick} disabled={disabled} style={disabled? {backgroundColor:"grey",border:"1px solid grey"}:null}>{claimbtn}</button>
            </div>
        </div>
    );
};

export {Claimfaucet};