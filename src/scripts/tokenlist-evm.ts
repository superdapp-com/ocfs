import * as fs from 'fs';
import { mainnet, pulsechain, base, bsc, degen, sepolia, holesky } from "viem/chains";
import { Chain, createPublicClient, erc20Abi, getAddress, http } from "viem";

const chains = [mainnet];

export const buildTokenList = async () => {
    await Promise.all(chains.map(async (chain) => {
        await getTokenList(chain);
    }));
}

const getTokenList = async (chain: Chain) => {
    let publicClient = createPublicClient({
        chain,
        transport: http()
    })

    let inPath = `./src/shared/tokens/${chain.id}_${chain.name}/list.json`
    let outPath = `./src/chains/${chain.id}_${chain.name}/tokenList.json`

    const addressList = fs.readFileSync(inPath);
    const tokenAddresses = JSON.parse(addressList.toString());

    const tokensRequests = tokenAddresses.map(async (tokenAddress: string) => {
        return await publicClient.multicall({
            contracts: [{
                address: getAddress(tokenAddress),
                abi: erc20Abi,
                functionName: "name",
            }, {
                address: getAddress(tokenAddress),
                abi: erc20Abi,
                functionName: "symbol",
            }, {
                address: getAddress(tokenAddress),
                abi: erc20Abi,
                functionName: "decimals",
            }],
            allowFailure: false
        })
        .then((result) => {
            return {
                chainId: chain.id,
                address: getAddress(tokenAddress),
                name: result[0],
                symbol: result[1],
                decimals: result[2],
            }
        })
    });

    const tokens = await Promise.all(tokensRequests);
    const tokenMap: Record<string, any> = {};

    tokens.forEach((token) => {
        const key = `${token.chainId}-${token.address}`;
        tokenMap[key] = token;
    });

    const tokenList = {
        name: `superdapp-tokens-${chain.name}-${chain.id}`,
        timestamp: Date.now(),
        version: {
          major: 1,
          minor: 0,
          patch: 0,
        },
        keywords: ["superdapp.com", "token", "list", chain.name, chain.id],
        tokens,
        tokenMap,
      };

    fs.writeFileSync(outPath, JSON.stringify(tokenList, null, 2));
}