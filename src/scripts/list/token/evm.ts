import * as fs from 'fs';
import { Chain, createPublicClient, erc20Abi, getAddress} from "viem";
import { evmChains, transportMap, getChainFolder, getTokenNameSymbol } from "../../globals.js";
import hexNameSymbolAbi from "../../custom-erc20-abis/hex-name-symbol-abi.json" assert { type: "json" };
import { hexToString, trim } from 'viem/utils';

export const evmTokenList = async () => {
    await Promise.all(evmChains.map(async (chain) => {
        await getTokenList(chain);
    }));
}

const hexNameSymbolAddresses = ["0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"]
const getTokenList = async (chain: Chain) => {

    const chainFolder = getChainFolder(chain);
    
    let publicClient = createPublicClient({
        chain,
        transport: transportMap[chain.id]
    })

    let outBasePath = `./src/chains/${chainFolder}`;
    let inPath = `./src/shared/tokens/${chainFolder}/list.json`
    let outPath = `${outBasePath}/tokenList.json`

    const addressList = fs.readFileSync(inPath);
    const tokenAddresses = JSON.parse(addressList.toString());

    const tokensRequests = tokenAddresses.flatMap(async (tokenAddress: string) => {
        let abi = erc20Abi

        const isHexNameSymbol = hexNameSymbolAddresses.includes(tokenAddress)
        if (isHexNameSymbol) {
            abi = hexNameSymbolAbi as any;
        }

        return await publicClient.multicall({
            contracts: [{
                address: getAddress(tokenAddress),
                abi: abi,
                functionName: "name",
            }, {
                address: getAddress(tokenAddress),
                abi: abi,
                functionName: "symbol",
            }, {
                address: getAddress(tokenAddress),
                abi: abi,
                functionName: "decimals",
            }],
            allowFailure: false
        })
        .then((result) => {

            if (isHexNameSymbol) {
                const token = {
                    chainId: chain.id,
                    address: getAddress(tokenAddress),
                    name: hexToString(trim(result[0] as `0x${string}`, { dir: "right" })),
                    symbol: hexToString(trim(result[1] as `0x${string}`, { dir: "right" })),
                    decimals: Number(result[2]),
                }
                return token;
            } else {    
                const token = {
                    chainId: chain.id,
                    address: getAddress(tokenAddress),
                    name: result[0],
                    symbol: result[1],
                    decimals: Number(result[2]),
                }
                return token;
            }
        })
    });

    const tokens = await Promise.all(tokensRequests);
    const tokenMap: Record<string, any> = {};

    tokens.forEach((token) => {
        const tokenDataPath = `${outBasePath}/tokens/${getTokenNameSymbol(token)}/${token.address}/`
        fs.mkdirSync(`${tokenDataPath}`, { recursive: true });
        fs.writeFileSync(`${tokenDataPath}/erc20.json`, JSON.stringify(token, null, 2));
        const key = `${token.chainId}_${token.address}`;
        tokenMap[key] = token;
    });

    const tokenList = {
        name: `superdapp-tokens-${chainFolder}`,
        timestamp: Date.now(),
        version: {
          major: 1,
          minor: 0,
          patch: 0,
        },
        keywords: ["superdapp.com", "token", "list", chainFolder],
        tokens,
        tokenMap,
      };

    fs.writeFileSync(outPath, JSON.stringify(tokenList, null, 2));
}