## Usage

### Install

```bash
yarn install
forge install
```

### Build

```bash
forge build
```

### Test Smart Contract

```bash
yarn build # Run this command every time you change the typescript files ( utils/* )
forge test --ffi
```

### Deploy

```bash
# opBNB Testnet
forge script script/DeployFactory.s.sol:DeployFactory --chain-id 5611 --rpc-url $OP_BNB_TESTNET_RPC_URL --broadcast --verify --verifier etherscan --etherscan-api-key opBNB_testnet --private-key $PRIVATE_KEY --legacy -vvvv
# NOTE: --legacy is added due to the error: - server returned an error response: error code -32000: transaction underpriced: tip needed 1, tip permitted 0

# Linea Sepolia
forge script script/DeployFactory.s.sol:DeployFactory --chain-id 59141 --rpc-url $LINEA_SEPOLIA_RPC_URL --broadcast --verify --verifier etherscan --etherscan-api-key opBNB_testnet --private-key $PRIVATE_KEY -vvvv

# Neon EVM Devnet
forge script script/DeployFactory.s.sol:DeployFactory --chain-id 245022926 --rpc-url $NEON_EVM_DEVNET_RPC_URL --broadcast --verify --verifier etherscan --etherscan-api-key opBNB_testnet --private-key $PRIVATE_KEY --legacy -vvvv
# NOTE --legacy is added due to the error: Failed to get EIP-1559 fees
```

### Generate Types

NOTE: Change `TYPES_DIR` in `utils/generateTypes.ts` to the correct path of the types directory

```bash
yarn build # Run this command every time you change the typescript files ( utils/* )
yarn generateTypes
```

### Generate Contract Address

NOTE: Change `CONTRACT_ADDRESS_DIR` in `utils/generateTypes.ts` to the correct path of the types directory

```bash
yarn build # Run this command every time you change the typescript files ( utils/* )
yarn generateContractAddress
```

### Test Generate Signature

```bash
yarn build # Run this command every time you change the typescript files ( utils/* )
yarn generateSignature 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0 0x 365 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```
