import { Chain, http, HttpTransport } from "viem";
import { mainnet, pulsechain, base, polygon } from "viem/chains";
import { env } from "../env.js";

export const chains = [mainnet, polygon, pulsechain, base];
export const transportMap: Record<number, HttpTransport> = {
    1: http(env.RPC_HTTP_1),
    137: http(env.RPC_HTTP_137),
    369: http(env.RPC_HTTP_369),
    8453: http(env.RPC_HTTP_8453),
}

export const getChainFolder = (chain: Chain) => {
    const chainName = chain.name.toLowerCase();
    return `${chain.id}_${chainName}`;
};

export const getTokenNameSymbol = (token: any) => {
    return `${token.name}_${token.symbol}`.replace(/\s+/g, '-').toLowerCase();
};
