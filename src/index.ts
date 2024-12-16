import * as fs from "fs";
import { dist } from "./scripts/dist.js";
import { buildMetrics } from "./scripts/metrics.js";
import { buildLists } from "./scripts/list/index.js";

switch (process.argv[2]) {
    case "--stage":
        buildLists();
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