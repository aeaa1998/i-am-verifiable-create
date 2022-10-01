import { Connection, clusterApiUrl, PublicKey, Keypair } from '@solana/web3.js';
import { AnchorProvider, Program } from '@project-serum/anchor'
import { useAnchorWallet, useWallet } from 'solana-wallets-vue'
import { computed } from 'vue';
import { keypairIdentity, Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { awsStorage } from "@metaplex-foundation/js-plugin-aws";


export const getKeyPair = () => {
    
    return { publicKey: new PublicKey("2kxrCSfcg9NFKBQdnsY6AywKpHouMLXCRofY1CEGaf1R")  }
}



let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const {wallet: normalWallet} = useWallet()
    const options = AnchorProvider.defaultOptions();
    // const connection = new Connection(clusterApiUrl('devnet'), options.commitment)
    const connection = new Connection(clusterApiUrl('devnet'))
    const connectionConfirm = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const provider = computed(() => new AnchorProvider(connection, wallet.value, options))
    const metaplex = computed(() => {
        const mx = Metaplex.make(connection)

        return mx

        }
    )
    

    workspace = {
        wallet,
        connection,
        provider,
        metaplex: metaplex,
        normalWallet,
        connectionConfirm
    }
}