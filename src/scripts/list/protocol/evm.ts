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
            if (getAddress(protocolAddress)) {
                const protocol = {
                    name: protocolName,
                    address: protocolAddress
                }
                protocols.push(protocol);
                const key = `${chain.id}_${protocolAddress}`;
                protocolMap[key] = protocol;
            }
        });
    });

    // Object.entries(protocolData).map(([protocol, address]) => ({
    //     name: protocol,
    //     address
    // })),

    //     const tokenMap: Record<string, any> = {};

    // tokens.forEach((token) => {
    //     const tokenDataPath = `${outBasePath}/tokens/${getTokenNameSymbol(token)}/${token.address}/`
    //     fs.mkdirSync(`${tokenDataPath}`, { recursive: true });
    //     fs.writeFileSync(`${tokenDataPath}/erc20.json`, JSON.stringify(token, null, 2));
    //     const key = `${token.chainId}_${token.address}`;
    //     tokenMap[key] = token;
    // });

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