import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";


import wallet from "./dev-wallet.json";

let from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("Ub3GcPyKzrZr5jxjin1wL494Gi5BRPLQ2mGyrbkyZqx");

let connection = new  Connection("https://api.devnet.solana.com/");

(async ()=>{
    try{

        //Get balance of dev wallet
     const balance = await connection.getBalance(from.publicKey);

        const transcation = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey:from.publicKey, 
              toPubkey: to,
              lamports: balance,
            })
        );
        transcation.recentBlockhash = (await connection.getLatestBlockhash(`confirmed`)).blockhash;
        transcation.feePayer = from.publicKey;



        //calculate exact fee rate to transfer entire SOL amount out of account minus fees

       const fees =  (await connection.getFeeForMessage(transcation.compileMessage(),`confirmed`)).value || 0;

       //Remove our transfer instructin to replace it
       transcation.instructions.pop();


       //Now add the nstruction back with correct amountof lamports


       transcation.add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance-fees,
        })
       )

        //sign transaction , broadcast ,a and confirm

        const signatur = await sendAndConfirmTransaction(
            connection,
            transcation,
            [from]
        );
        console.log(`Succes! Check out your TX here: https://explorer.solana.com/tx/${signatur}?cluster=devnet`);
        
    }catch(e){
        console.log(`Oops , something went wrong: ${e}`);
    }
})();
    