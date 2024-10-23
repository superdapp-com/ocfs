# ocfs

off-chain cdn to store protocol and token data

## Getting started

```
git clone https://github.com/superdapp-com/ocfs.git
cd ocfs
bun install
```

*Stage Updates*

```
bun stage
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
    ├── [protocol_name]_[contract_address].json
    ├── [token_address]_erc20.json
    └── [token_address].svg
```
