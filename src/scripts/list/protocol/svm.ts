import { Chain } from "viem";
import { getChainFolder, svmChains } from "../../globals.js";
import * as fs from "fs";

export const svmProtocolList = async () => {
    const inProtocolNamePath = `./src/shared/protocols/`
    const protocols = fs.readdirSync(inProtocolNamePath);
    
    await Promise.all(svmChains.map(async (chain) => {
        await getProtocolList(chain, protocols);
    }));
}

const getProtocolList = async (chain: Chain, protocols: string[]) => {
    const chainFolder = getChainFolder(chain);

    const outPath = `./src/chains/${chainFolder}/protocolList.json`

    const protocolData: Record<string, string> = {}


    const protocolList = {
        name: `superdapp-protocols-${chainFolder}`,
        timestamp: Date.now(),
        version: {
          major: 1,
          minor: 0,
          patch: 0,
        },
        keywords: ["superdapp.com", "token", "list", chainFolder],
        protocols: Object.entries(protocolData).map(([protocol, address]) => ({
            name: protocol,
            address
        })),
        protocolMap: protocolData
      };

    fs.writeFileSync(outPath, JSON.stringify(protocolList, null, 2));
}