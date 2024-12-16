import { defineChain } from "viem";

export const solana = defineChain({
    id: 101,
    name: "Solana",
    nativeCurrency: {
        name: "Solana",
        symbol: "SOL",
        decimals: 9,
    },
    rpcUrls: {
        default: {
            http: ["https://api.mainnet-beta.solana.com"],
        },
    },
    blockExplorers: {
        default: {
            name: "Solana Explorer",
            url: "https://explorer.solana.com",
        },
    },
}); 