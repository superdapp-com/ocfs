import * as fs from 'fs';
import { env } from '../../../env.js';
import * as anchor from '@coral-xyz/anchor';
import { AnchorProvider, setProvider, Program } from '@coral-xyz/anchor';
import { getMint } from '@solana/spl-token';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
import { getChainFolder, svmChains } from '../../globals.js';
import { Chain } from 'viem';

export const svmTokenList = async () => {
    await Promise.all(svmChains.map(async (chain) => {
        await getTokenList(chain);
    }));
}


const getTokenList = async (chain: Chain) => {
    const chainFolder = getChainFolder(chain);
    let outBasePath = `./src/chains/${chainFolder}`;
    let inPath = `./src/shared/tokens/${chainFolder}/list.json`
    let outPath = `${outBasePath}/tokenList.json`

    const connection = new anchor.web3.Connection(env.RPC_HTTP_101, 'confirmed');

    const addressList = fs.readFileSync(`./src/shared/tokens/${chain.id}_solana/list.json`);
    const tokenAddresses = JSON.parse(addressList.toString());

    const tokenMap = await loadTokenMap();


    const tokens = await Promise.all(
        tokenAddresses.flatMap(async (address: string) => {
            
            const mintInfo = await getMint(
                connection,
                new anchor.web3.PublicKey(address),
            );
            const tokenInfo = tokenMap.get(address);

            if (!tokenInfo) {
                return null;
            }

            return {
                chainId: 101,
                address: tokenInfo.address,
                name: tokenInfo.name,
                symbol: tokenInfo.symbol,
                decimals: mintInfo.decimals
            };
        })
    );

    const tokenList = {
        name: 'superdapp-tokens-solana',
        timestamp: Date.now(),
        version: {
            major: 1,
            minor: 0,
            patch: 0
        },
        keywords: ['superdapp.com', 'token', 'list', 'solana'],
        tokens,
        tokenMap: tokens.reduce((acc: Record<string, any>, token) => {
            acc[token.address] = token;
            return acc;
        }, {})
    };

    fs.writeFileSync(outPath, JSON.stringify(tokenList, null, 2));
}


async function loadTokenMap(): Promise<Map<string, TokenInfo>> {
    const tokenListProvider = new TokenListProvider();
    const tokenListContainer = await tokenListProvider.resolve();
    const tokenList = tokenListContainer.filterByChainId(101).getList();
    const tokenMap = new Map<string, TokenInfo>();
    tokenList.forEach((token) => {
      tokenMap.set(token.address, token);
    });
    return tokenMap;
  }