import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();

console.log(`You've Generated a new Solana Wallet: ${kp.publicKey.toBase58()}`);

console.log(`[${kp.secretKey}]`);