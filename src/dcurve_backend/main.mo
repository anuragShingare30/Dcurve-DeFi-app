import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

// PRINCIPAL ID: b62zc-lsgmp-n4oyi-pxfzi-ncb5l-hnlgl-5aura-o22kh-cvtxp-lklk4-tae

actor Dcurve {
  // HERE, WE ARE CREATING ICP TOKENS AND USING OUR OWN DAN COINS.
  // Debug.print("Hello");
  // 'token_owner' ARE THE USER WHO AUTHENTICATE AND HAS THEIR OWN PRINCIPLE ID.
  var tokenOwner : Principal = Principal.fromText("b62zc-lsgmp-n4oyi-pxfzi-ncb5l-hnlgl-5aura-o22kh-cvtxp-lklk4-tae"); 
  var totalSupply : Nat = 1000000000;
  totalSupply := 1000000000;
  var ourTokenSymbol : Text = "ICP";

  // OUR LEDGER IS JUST GOING TO BE A DATA STORE THAT STORES THE ID OF A PARTICULAR USER OR CANISTER AS WELL AMOUNT.'balances' IS OUR LEDGER.
  // LEDGER WILL STORE THE PRINCIPAL ID OF OWNER AND AMOUNT PRESENT IN THEIR WALLET.
  
  // THIS IS OUR TEMPORARY STABLE VARIABLE WHICH WILL STORE ID AND AMOUNT IN AN ARRAY IN THE FORM OF TUPLES.
  private stable var entries : [(Principal, Nat)] = [];
  // HASHMAPS CANNOT BE AN STABLE VARIABLE
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  // INITIALLY OUR LEDGER IS EMPTY DICTIONARY.
  // HASHMAPS ARE THE DICTIONARY WHICH CONSIST OF KEY AND VALUE. ====>     balances.put(k:key, v:value);
  // balances.put(tokenOwner, totalSupply);
    
  if(balances.size() < 1){
      balances.put(tokenOwner, totalSupply);
    };

  // HERE, THIS QUERY FUNCTION WILL TAKE PRINCIPAL ID AS ARGUMENT AND RETURN THE CURRENT BALANCE OF OWNER. 
  public query func balanceOf(who:Principal) : async Nat{
    var balance : Nat = switch (balances.get(who)){
      case null 0;
      case (?result) result; 
    };
    return balance;
  };

  // HERE, THIS FUNCTION WILL RETURN THE SYMBOL OF OUR TOKEN.
  public query func symbol():async Text{
    return ourTokenSymbol;
  };

  // HERE, 'shared' FUNCTION IS USED TO GET THE PRINCIPAL ID OF THE USER/OWNER.
  // 'msg.caller' ===> THIS WILL RETURN PRINCIPAL ID OF OWNER/USER WHO AUTHENTICATE ON OUR WEB APP.
  public shared(msg) func payOut() : async Text{
    Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null){
      var amount : Nat = 10000;
      // amount := 10000;
      var result = await transfer(msg.caller, amount);
      return result;
    }else{
      return "Already Claimed!!!";
    };
    
  };

  //
  public shared(msg) func transfer(toAddress:Principal, amount:Nat): async Text{

      // THIS IS SENDER'S ACCOUNT
      let fromBalance = await balanceOf(msg.caller);
      if(fromBalance > amount){
        let fromAmount:Nat = fromBalance - amount;
        balances.put(msg.caller, fromAmount);

      // THIS IS RECIEVER'S ACCOUNT
        let toBalance = await balanceOf(toAddress);
        let toAmount:Nat = toBalance + amount;
        balances.put(toAddress, toAmount);
        
        return "Success✅";
      }
      else{
        return "Insufficient Fund"; 
      };
      
  };

  // STATE PRESERVATION ===>   The preupgrade method captures the current state by converting the map's entries to an array and storing it in a stable variable.
  system func preupgrade(){
    entries := Iter.toArray(balances.entries());

  };
  // STATE RESTORATION ===>  The postupgrade method restores the state by recreating the HashMap from the stored array of entries.
  system func postupgrade(){
    balances := HashMap.fromIter<Principal,Nat>(entries.vals(), 1, Principal.equal, Principal.hash);
    if(balances.size() < 1){
      balances.put(tokenOwner, totalSupply);
    }
  };


}



// dfx identity get-principal
// OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""  
// echo $OWNER_PUBLIC_KEY
// dfx canister call dcurve balanceOf "($OWNER_PUBLIC_KEY )"


// LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id dcurve_backend )\""
// echo $LIVE_CANISTER_KEY
// dfx canister --network ic call dcurve_backend transfer "($LIVE_CANISTER_KEY, 500_000_000)"