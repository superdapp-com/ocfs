import { execSync } from "child_process";

// Check if all arguments are provided
if (process.argv.length !== 4) {
    console.log("Usage: bun run add-rpc <chain_id> <rpc_url>");
    console.log("Example: bun run add-rpc 137 https://polygon-rpc.com");
    process.exit(1);
}

const CHAIN_ID = process.argv[2];
const RPC_URL = process.argv[3];
const ENV_VAR_NAME = `RPC_HTTP_${CHAIN_ID}`;

// Helper function to run sed commands
const runSed = (pattern: string, file: string) => {
    try {
        execSync(`sed -i "${pattern}" ${file}`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error);
    }
};

// Update env.ts
runSed(`/server: {/a \\    ${ENV_VAR_NAME}: z.string(),`, "src/env.ts");
runSed(`/runtimeEnv: {/a \\    ${ENV_VAR_NAME}: process.env.${ENV_VAR_NAME},`, "src/env.ts");

// Update globals.ts
runSed(`/transportMap: Record<number, HttpTransport> = {/a \\    ${CHAIN_ID}: http(env.${ENV_VAR_NAME}),`, "src/scripts/globals.ts");

// Update GitHub Actions workflow
runSed(`/env:/a \\      ${ENV_VAR_NAME}: \${{ secrets.${ENV_VAR_NAME} }}`, ".github/workflows/deploy.yml");

console.log("RPC endpoints added successfully!");
console.log("");
console.log("Next steps:");
console.log("1. Add the chain to the chains array in src/scripts/globals.ts");
console.log(`2. Add ${ENV_VAR_NAME} to your .env file with the RPC URL: ${RPC_URL}`);
console.log(`3. Add ${ENV_VAR_NAME} to your GitHub repository secrets`); 