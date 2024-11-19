import * as fs from "fs";
import { chains, getChainFolder, getTokenNameSymbol } from "./globals.js";


export const dist = (distBasePath: string) => {
    const inBasePath = "./src/chains";
    const sharedBasePath = "./src/shared";
    
    for (const chain of chains) {
        const chainFolder = getChainFolder(chain);
        fs.mkdirSync(`${distBasePath}/${chain.id}`, { recursive: true });

        const inChainBasePath = `${inBasePath}/${chainFolder}`;
        const outChainBasePath = `${distBasePath}/${chain.id}`;

        const chainLogoPath = `${inChainBasePath}/image.svg`;
        const tokenListPath = `${inChainBasePath}/tokenList.json`;
        const protocolListPath = `${inChainBasePath}/protocolList.json`;
        fs.copyFileSync(chainLogoPath, `${distBasePath}/${chain.id}.svg`);
        fs.linkSync(`${distBasePath}/${chain.id}.svg`, `${distBasePath}/${chain.id}_null.svg`);
        fs.copyFileSync(tokenListPath, `${outChainBasePath}/tokenList.json`);
        fs.copyFileSync(protocolListPath, `${outChainBasePath}/protocolList.json`);

        fs.mkdirSync(`${outChainBasePath}/abi`, { recursive: true });
        fs.mkdirSync(`${outChainBasePath}/erc20`, { recursive: true });
        fs.mkdirSync(`${outChainBasePath}/address/protocol`, { recursive: true });
        fs.mkdirSync(`${outChainBasePath}/address/token`, { recursive: true });

        const protocolList = JSON.parse(fs.readFileSync(protocolListPath, "utf8"));
        for (const protocol of protocolList.protocols) {
            const { name, address } = protocol;
            fs.copyFileSync(`${sharedBasePath}/protocols/${name}/abi.json`, `${outChainBasePath}/abi/${name}_${address}.json`);
            fs.writeFileSync(`${outChainBasePath}/address/protocol/${name}.json`, JSON.stringify({ address }, null, 2));
        }

        const tokenList = JSON.parse(fs.readFileSync(tokenListPath, "utf8"));
        for (const token of tokenList.tokens) {
            const tokenNameSymbol = getTokenNameSymbol(token);
            const tokenName = tokenNameSymbol.split("_")[0];
            fs.copyFileSync(`${sharedBasePath}/images/${tokenName}/image.svg`, `${outChainBasePath}/${token.address}.svg`);
            fs.copyFileSync(`${inChainBasePath}/tokens/${tokenNameSymbol}/${token.address}/erc20.json`, `${outChainBasePath}/erc20/${token.address}.json`);
            fs.writeFileSync(`${outChainBasePath}/address/token/${tokenName}.json`, JSON.stringify({ address: token.address }, null, 2));
        }
    }

}