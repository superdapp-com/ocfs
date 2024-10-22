import { buildProtocolList } from "./scripts/protocol-list-evm.js";
import { buildTokenList } from "./scripts/token-list-evm.js";

switch (process.argv[2]) {
    case "--stage":
        buildProtocolList();
        // buildTokenList();
        break;
    case "--dist":
        console.log("dist world");
        break;
    default:
        console.log("no flag provided");
        break;
}