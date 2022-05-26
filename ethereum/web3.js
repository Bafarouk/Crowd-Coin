import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running
  window.ethereum.request({ method: "eth_requestAccount" });
  web3 = new Web3(window.ethereum);
} else {
  // we are in the browser OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/85b6b975cd274a18b44624f745e42746"
  );

  web3 = new Web3(provider);
}

export default web3;
