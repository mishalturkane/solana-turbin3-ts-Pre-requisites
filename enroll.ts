import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

// Import Keypair from wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Create Buffer for GitHub username
const github = Buffer.from("mishalturkane", "utf8");

// Create Anchor provider
const provider = new AnchorProvider(
    connection,
    new Wallet(keypair),
    { commitment: "confirmed" }
);

// Initialize the program
const program: Program<Turbin3Prereq> = new Program(IDL, provider); //page 11

// Create PDA for the enrollment account
const enrollment_seeds = [
    Buffer.from("pre"),
    keypair.publicKey.toBuffer()
];

const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
    enrollment_seeds,
    program.programId
);

// Execute the enrollment transaction
(async () => {
    try {
        const txhash = await program.methods
            .submit(github) // Pass any necessary arguments
            .accounts({
                signer: keypair.publicKey,
            })
            .signers([
                keypair
            ]).rpc();

        console.log(
            `Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
        );
    } catch (e) {
        console.log(`Oops, something went wrong: ${e}`);
    }
})();
