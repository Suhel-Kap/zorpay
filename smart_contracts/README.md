## Usage

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

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Test Generate Signature

```bash
yarn build
yarn generateSignature 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0 0x 365 1 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```
