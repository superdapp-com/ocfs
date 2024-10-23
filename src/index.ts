import { buildProtocolList } from "./scripts/protocol-list-evm.js";
import { buildTokenList } from "./scripts/token-list-evm.js";
import { dist } from "./scripts/dist.js";

switch (process.argv[2]) {
    case "--stage":
        buildProtocolList();
        buildTokenList();
        break;
    case "--dist":
        dist();
        break;
    default:
        console.log("no flag provided");
        break;
}