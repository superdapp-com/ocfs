import * as fs from 'fs';
import { Chain, getAddress } from "viem";
import { evmChains, getChainFolder } from "../../globals.js";

export const evmProtocolList = async () => {
    const inProtocolNamePath = `./src/shared/protocols/`
    const protocolNames = fs.readdirSync(inProtocolNamePath);
    
    await Promise.all(evmChains.map(async (chain) => {
        await getProtocolList(chain, protocolNames);
    }));
}

const getProtocolList = async (chain: Chain, protocolNames: string[]) => {

    const chainFolder = getChainFolder(chain);

    const outPath = `./src/chains/${chainFolder}/protocolList.json`

    let protocols: { name: string, address: string }[] = []
    let protocolMap: Record<string, any> = {}

    protocolNames.forEach((protocolName: string) => {
        const inProtocolAddressPath = `./src/chains/${chainFolder}/protocols/${protocolName}/`
        if (!fs.existsSync(inProtocolAddressPath)) {
            return;
        }
        const protocolAddresses = fs.readdirSync(inProtocolAddressPath);
        protocolAddresses.forEach((protocolAddress) => {
            let tokenAddresses: string[] = [];
            const tokenAddressesPath = `${inProtocolAddressPath}/${protocolAddress}/tokenAddresses.json`;
            
            if (fs.existsSync(tokenAddressesPath)) {
                const tokenAddressesData = fs.readFileSync(tokenAddressesPath, "utf8");
                tokenAddresses = JSON.parse(tokenAddressesData);
            }
            
            if (getAddress(protocolAddress)) {
                const protocol = {
                    name: protocolName,
                    address: protocolAddress,
                    tokenAddresses: tokenAddresses
                }
                protocols.push(protocol);
                protocolMap[protocolName] = protocol;
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
        protocols,
        protocolMap
      };

    fs.writeFileSync(outPath, JSON.stringify(protocolList, null, 2));
}