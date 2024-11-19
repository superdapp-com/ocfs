import * as fs from 'fs';

type Stats = {
    chains: number;
    tokens: number;
    protocols: number;
    actions: number;
};

export const buildMetrics = async (distBasePath: string) => {

    const chains = fs.readdirSync(`./src/chains`);
    const tokens = fs.readdirSync(`./src/shared/images`);
    const protocols = fs.readdirSync(`./src/shared/protocols`);

    const stats: Stats = {
        chains: chains.length,
        tokens: tokens.length,
        protocols: protocols.length,
        actions: 12,
    };

    fs.writeFileSync(`${distBasePath}/metrics.json`, JSON.stringify(stats, null, 2));
}