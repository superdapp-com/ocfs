import { Chain, http, HttpTransport } from "viem";
import { mainnet, pulsechain, base, polygon, sepolia, holesky } from "viem/chains";
import { env } from "../env.js";
import { solana } from "../lib/solana.js";



const evmMainnetChains = [mainnet, polygon, pulsechain, base];
const evmTestnetChains = [sepolia, holesky];
export const evmChains = [...evmMainnetChains, ...evmTestnetChains];

export const svmChains = [solana];

export const allChains = [...evmChains, ...svmChains];

export const transportMap: Record<number, HttpTransport> = {
    1: http(env.RPC_HTTP_1),
    137: http(env.RPC_HTTP_137),
    369: http(env.RPC_HTTP_369),
    8453: http(env.RPC_HTTP_8453),
    17000: http(env.RPC_HTTP_17000),
    11_155_111: http(env.RPC_HTTP_11155111),
}

export const getChainFolder = (chain: Chain) => {
    const chainName = chain.name.toLowerCase();
    return `${chain.id}_${chainName}`;
};

export const getTokenNameSymbol = (token: any) => {
    return `${token.name}_${token.symbol}`.replace(/\s+/g, '-').toLowerCase();
};