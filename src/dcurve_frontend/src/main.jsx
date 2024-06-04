import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthClient } from "@dfinity/auth-client";
import './index.css';


// THIS IS CODE FOR AUTHENTICATION USING INTERNET IDENTITY.
let init = async () => {

  // HERE WE HAVE CREATED NEW 'authClient' OBJECT TO LOGIN OUR USER.
  let authClient = await AuthClient.create();

  
  // IF USER IS ALREADY AUTHENTICATED, THEY WILL BE DIRECTLY RENDER TO OUR FRONTEND.
  if(await authClient.isAuthenticated()){
    // 'isAuthenticated()' METHOD WILL CHECK WHETHER USER IS ALREADY AUTHENTICATED OR NOT. 
    handleAuthenticated(authClient);
  }
  // ELSE IF USER IS AUTHENTICATING FOR FIRST TIME, THEN LOGIN PAGE WILL BE RENDER TO USER.
  else{
    await authClient.login({
      identityProvider : "https://identity.icp0.io/#authorize",
      onSuccess:()=>{
        handleAuthenticated(authClient);
      }
    });
  };

  // THIS ASYNC FUNCTION WILL RENDER OUR REACT FRONTEND WHENEVER IS CALLED.
  async function handleAuthenticated(authClient){
    // THIS METHOD IS USED TO GET PRINCIPAL ID OF THE USER AUTHENTICATED.
    var authenticatedIdentity = await authClient.getIdentity(); 
    var principalId = authenticatedIdentity._principal.toString();
    console.log(principalId);
    ReactDOM.createRoot(document.querySelector(".root")).render(
      <App userId={principalId}></App>
    );
  };

};

init();











 
