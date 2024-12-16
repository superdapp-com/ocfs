import * as fs from 'fs';
import { Chain, getAddress } from "viem";
import { evmChains, getChainFolder } from "../../globals.js";

export const evmProtocolList = async () => {
    const inProtocolNamePath = `./src/shared/protocols/`
    const protocols = fs.readdirSync(inProtocolNamePath);
    
    await Promise.all(evmChains.map(async (chain) => {
        await getProtocolList(chain, protocols);
    }));
}

const getProtocolList = async (chain: Chain, protocols: string[]) => {

    const chainFolder = getChainFolder(chain);

    const outPath = `./src/chains/${chainFolder}/protocolList.json`

    const protocolData: Record<string, string> = {}

    protocols.forEach((protocol: string) => {
        const inProtocolAddressPath = `./src/chains/${chainFolder}/protocols/${protocol}/`
        if (!fs.existsSync(inProtocolAddressPath)) {
            return;
        }
        const protocolAddresses = fs.readdirSync(inProtocolAddressPath);

        protocolAddresses.forEach((protocolAddress) => {
            if (getAddress(protocolAddress)) {
                protocolData[protocol] = protocolAddress;
            }
        });
    });

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