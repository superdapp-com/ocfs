import * as fs from "fs";
import { buildProtocolList } from "./scripts/protocol-list-evm.js";
import { buildTokenList } from "./scripts/token-list-evm.js";
import { dist } from "./scripts/dist.js";
import { buildMetrics } from "./scripts/metrics.js";

switch (process.argv[2]) {
    case "--stage":
        buildProtocolList();
        buildTokenList();
        break;
    case "--deploy":
        const distBasePath = "./dist";
        fs.rmdirSync(distBasePath, { recursive: true });
        fs.mkdirSync(distBasePath, { recursive: true });
        buildMetrics(distBasePath);
        dist(distBasePath);
        break;
    default:
        console.log("no flag provided");
        break;
}