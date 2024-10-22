import { buildTokenList } from "./scripts/tokenlist-evm.js";

switch (process.argv[2]) {
    case "--stage":
        buildTokenList();
        break;
    case "--dist":
        console.log("dist world");
        break;
    default:
        console.log("no flag provided");
        break;
}