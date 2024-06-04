import React from 'react'; 
import { Head } from './Header';
import { Transfertoken } from './Transfer';
import { Claimfaucet } from './Faucet';
import { Checkbalance } from './Balance';
import { Footer } from './Footer';
// import { dcurve_backend } from 'declarations/dcurve_backend';
 
function App(props) {
  
  return (
    <div className="main">
      <Head></Head>
      <div className="box">
        <div className="box_content">
          <Claimfaucet userId={props.userId}></Claimfaucet>
          <Checkbalance></Checkbalance>
        </div>
        <Transfertoken></Transfertoken>
      </div>
      <Footer></Footer>
    </div>
  ); 
};

export default App;
