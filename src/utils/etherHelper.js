import { providers } from "ethers";

export default class etherHelper {
    setProvider(provider) {
        this.web3Provider = new providers.Web3Provider(provider);
        this.signer = this.web3Provider.getSigner();
    }

    getAddress() {
        return this.signer.getAddress()
    }
}