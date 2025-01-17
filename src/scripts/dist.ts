import * as fs from "fs";
import { allChains, getChainFolder, getTokenNameSymbol } from "./globals.js";


export const dist = (distBasePath: string) => {
    const inBasePath = "./src/chains";
    const sharedBasePath = "./src/shared";
    const staticBasePath = "./src/static";

    for (const chain of allChains) {
        const chainFolder = getChainFolder(chain);
        fs.mkdirSync(`${distBasePath}/${chain.id}`, { recursive: true });

        const inChainBasePath = `${inBasePath}/${chainFolder}`;
        const outChainBasePath = `${distBasePath}/${chain.id}`;

        const chainLogoPath = `${inChainBasePath}/image.svg`;
        const tokenListPath = `${inChainBasePath}/tokenList.json`;
        const protocolListPath = `${inChainBasePath}/protocolList.json`;
        fs.copyFileSync(chainLogoPath, `${distBasePath}/${chain.id}.svg`);
        if (!fs.existsSync(`${distBasePath}/${chain.id}/null.svg`)) {
            fs.linkSync(`${distBasePath}/${chain.id}.svg`, `${distBasePath}/${chain.id}/null.svg`);
        }
        fs.copyFileSync(tokenListPath, `${outChainBasePath}/tokenList.json`);
        fs.copyFileSync(protocolListPath, `${outChainBasePath}/protocolList.json`);

        fs.mkdirSync(`${outChainBasePath}/abi`, { recursive: true });
        fs.mkdirSync(`${outChainBasePath}/erc20`, { recursive: true });
        fs.mkdirSync(`${outChainBasePath}/address/protocol`, { recursive: true });
        fs.mkdirSync(`${outChainBasePath}/address/token`, { recursive: true });

        const protocolList = JSON.parse(fs.readFileSync(protocolListPath, "utf8"));
        for (const protocol of protocolList.protocols) {
            const { name, address } = protocol;
            if (fs.existsSync(`${sharedBasePath}/images/${name}/image.svg`)) {
                console.log("found protocol image", name);
                fs.copyFileSync(`${sharedBasePath}/images/${name}/image.svg`, `${outChainBasePath}/${address}.svg`);
            }

            fs.copyFileSync(`${sharedBasePath}/protocols/${name}/abi.json`, `${outChainBasePath}/abi/${name}_${address}.json`);
            fs.writeFileSync(`${outChainBasePath}/address/protocol/${name}.json`, JSON.stringify({ address }, null, 2));
        }

        const tokenList = JSON.parse(fs.readFileSync(tokenListPath, "utf8"));
        for (const token of tokenList.tokens) {
            const tokenNameSymbol = getTokenNameSymbol(token);
            const tokenName = tokenNameSymbol.split("_")[0];
            fs.copyFileSync(`${sharedBasePath}/images/${tokenName}/image.svg`, `${outChainBasePath}/${token.address}.svg`);
            if (fs.existsSync(`${inChainBasePath}/tokens/${tokenNameSymbol}/${token.address}/erc20.json`)) {
                fs.copyFileSync(`${inChainBasePath}/tokens/${tokenNameSymbol}/${token.address}/erc20.json`, `${outChainBasePath}/erc20/${token.address}.json`);
            }
            fs.writeFileSync(`${outChainBasePath}/address/token/${tokenName}.json`, JSON.stringify({ address: token.address }, null, 2));
        }

        // Copy chain-specific static files if they exist
        const chainStaticPath = `${staticBasePath}/${chain.id}`;
        if (fs.existsSync(chainStaticPath)) {
            const files = fs.readdirSync(chainStaticPath);
            for (const file of files) {
                const sourcePath = `${chainStaticPath}/${file}`;
                const destPath = `${outChainBasePath}/${file}`;
                fs.copyFileSync(sourcePath, destPath);
            }
        }
    }

    // loop through all svgs in each chain folder and convert them to webp
    for (const chain of allChains) {
        const outChainBasePath = `${distBasePath}/${chain.id}`;
        const chainStaticPath = `${staticBasePath}/${chain.id}`;
        const files = fs.readdirSync(chainStaticPath);
        for (const file of files) {
            if (file.endsWith(".svg")) {
                const sourcePath = `${chainStaticPath}/${file}`;
                const destPath = `${outChainBasePath}/${file.replace(".svg", ".webp")}`;
                fs.copyFileSync(sourcePath, destPath);
            }
        }
    }
}
