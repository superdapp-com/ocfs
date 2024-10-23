import * as fs from "fs";
import { chains, getChainFolder, getTokenNameSymbol } from "./globals.js";


export const dist = () => {
    const inBasePath = "./src/chains";
    const sharedBasePath = "./src/shared";
    const outBasePath = "./dist";
    for (const chain of chains) {
        const chainFolder = getChainFolder(chain);
        fs.mkdirSync(`${outBasePath}/${chain.id}`, { recursive: true });

        const tokenListPath = `${inBasePath}/${chainFolder}/tokenList.json`;
        const protocolListPath = `${inBasePath}/${chainFolder}/protocolList.json`;
        fs.copyFileSync(tokenListPath, `${outBasePath}/${chain.id}/tokenList.json`);
        fs.copyFileSync(protocolListPath, `${outBasePath}/${chain.id}/protocolList.json`);

        const tokenList = JSON.parse(fs.readFileSync(tokenListPath, "utf8"));
        for (const token of tokenList.tokens) {
            const tokenNameSymbol = getTokenNameSymbol(token);
            const tokenName = tokenNameSymbol.split("_")[0];
            fs.copyFileSync(`${sharedBasePath}/images/${tokenName}/image.svg`, `${outBasePath}/${chain.id}/${token.address}.svg`);
            fs.copyFileSync(`${inBasePath}/${chainFolder}/tokens/${tokenNameSymbol}/${token.address}/erc20.json`, `${outBasePath}/${chain.id}//${token.address}_erc20.json`);
        }
    }

}