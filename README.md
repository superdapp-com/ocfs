# OCFS (Off-Chain File Storage)

Off-chain file storage system for blockchain data.

## Setup

1. Install dependencies:

```
git clone https://github.com/superdapp-com/ocfs.git
cd ocfs
bun install
```

## Adding a New Chain

To add support for a new blockchain network:

```bash
bun run add-rpc <chain_id> <rpc_url>

# Example:
bun run add-rpc 137 https://polygon-rpc.com
```

After running the script, complete these steps:
1. Add the chain to the `chains` array in `src/scripts/globals.ts`
2. Add the RPC URL to your `.env` file
3. Add the RPC URL to your GitHub repository secrets

## Usage

*Stage Updates*

```
bun stage
```

*Deploy Updates*

```
bun deploy
```

### Source Directory Structure (src/)

The `src/` directory is designed for contributors. It is organized to reflect the relationships between chains, protocols, and tokens, making it easy to navigate and update.

```
src/
├── chains/
│   ├── [chain_id]_[chain_name]/
│   │   ├── tokenList.json
│   │   ├── protocolList.json
│   │   ├── protocols
│   │   │   └── [protocol_name]/
│   │   │       └── [contract_address]/
│   │   └── tokens
│   │       └── [token_name]/
│   │           └── [token_address]/
│   └── [other chains]/
├── scripts/
└── shared/
    ├── images/
    ├── protocols/
    └── tokens/
```

### Distribution Directory Structure (dist/)

The `dist/` directory is optimized for software consumption, with concise paths and organized for efficient reading.

```
dist/
└── [chain_id]/
    ├── tokenList.json
    ├── protocolList.json
    ├── abi/
    │   └── [protocol_name]_[contract_address].json
    ├── erc20/
    │   └── [token_address].json
    └── [token_address].svg
```

## Environment Variables

Create a `.env` file with your RPC endpoints:

```
RPC_HTTP_1=<ethereum_rpc_url>
RPC_HTTP_137=<polygon_rpc_url>
RPC_HTTP_369=<pulsechain_rpc_url>
RPC_HTTP_8453=<base_rpc_url>
```

For deployment, you'll also need Cloudflare R2 credentials in your GitHub repository secrets.