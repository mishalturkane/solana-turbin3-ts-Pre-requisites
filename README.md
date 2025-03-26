# Solana-Turbin3-ts-Pre-requisites
In this project you will:
1. Learn how to use @solana/web3.js to create a new keypair
2. Use our Public Key to airdrop ourselves some Solana devnet tokens
3. Make Solana transfers on devnet
4. Empty your devnet wallet into your Turbin3 wallet
5. Use our Turbin3 Private Key to enroll in the Turbin3 enrollment dApp
## Generate new Keypair
To get started, we're going to create a keygen script and an airdrop script for our account.
### Setting up 
Start by opening up your Terminal. We're going to use yarn to create a new Typescript project. <br>

```bash
mkdir airdrop && cd airdrop
yarn init -y
```
Now that we have our new project initialized, we're going to go ahead and add typescript, bs58 and @solana/web3.jsalong with generating a tsconfig.js configuration file.

```bash
yarn add @types/node typescript @solana/web3.js bs58
yarn add -D ts-node
touch keygen.ts
touch airdrop.ts
touch transfer.ts
touch enroll.ts
yarn tsc --init --rootDir ./ --outDir ./dist --esModuleInterop --lib ES2019 --module commonjs --resolveJsonModule true --noImplicitAny true
```

### Generating a Keypair
Code the ./keygen.ts file
```bash
yarn keygen.ts
````