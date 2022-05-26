import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  "0x1449Cb71ce131dd968234dFa33D7e981c9822208"
);

export default instance;
