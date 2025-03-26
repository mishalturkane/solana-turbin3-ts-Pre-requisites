import { Connection , Keypair , LAMPORTS_PER_SOL } from "@solana/web3.js";

import wallet from "./dev-wallet.json";

let keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

let connection = new  Connection("https://api.devnet.solana.com/");

(async ()=>{
    try{
        const txshash = await connection.requestAirdrop(keypair.publicKey,1*LAMPORTS_PER_SOL);
        console.log(`Succes! Check out your TX here: https://explorer.solana.com/tx/${txshash}?cluster=devnet`);
        
    }catch(e){
        console.log(`Oops , something went wrong: ${e}`);
    }
})();