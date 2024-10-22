# ocfs

off-chain cdn to store protocol and token data

## Getting started

```
git clone https://github.com/superdapp-com/ocfs.git
cd ocfs
bun install
``` 

### Source Directory Structure (src/)

The `src/` directory is designed for contributors. It is organized to reflect the relationships between chains, protocols, and tokens, making it easy to navigate and update.

```
src/
├── chains/
│   ├── <chain_identifier>/
│   │   ├── protocols/
│   │   │   └── <protocol_name>/
│   │   │       ├── <instance_identifier>/
│   │   │       │   ├── contracts/
│   │   │       │   │   └── <contract_name>.json
│   │   │       │   └── metadata.json
│   │   └── tokens/
│   │       └── <token_symbol>/
│   │           ├── <instance_identifier>/
│   │           │   ├── metadata.json
│   │           │   └── image.png
├── protocols/
│   └── <protocol_name>/
│       ├── abi.json
│       └── metadata.json
└── tokens/
    └── <token_symbol>/
        └── metadata.json
```

### Distribution Directory Structure (dist/)

The `dist/` directory is optimized for software consumption, with concise paths and organized for efficient reading.

```
dist/
├── protocols/
│   └── <chain_identifier>/
│       └── <protocol_address>/
│           ├── abi.json
│           └── metadata.json
├── tokens/
│   └── <chain_identifier>/
│       └── <token_address>/
│           ├── metadata.json
│           └── image.png
└── chains.json
```
