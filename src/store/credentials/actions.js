
import { getKeyPair, useWorkspace } from '@/composables/useWorkspace'
export default {
    async getNftTransactions ({ commit, state }, nft) {
        let allSignatures = []
        const { connection } = useWorkspace();
        let mintAddress = nft.mint ? nft.mint.address : nft.mintAddress
        let signatures = await connection.getSignaturesForAddress(mintAddress)
        let lastFound = signatures[signatures.length - 1]
        allSignatures = [...signatures]
      
        while(signatures.length){
            signatures = await connection.getSignaturesForAddress(mintAddress, {
                before: lastFound.signature
            })
            if(signatures.length){
                allSignatures.push(...signatures)
                lastFound = signatures[signatures.length - 1]
            }
        }
        
        state.nftTransactionsMapped[mintAddress.toBase58()] = allSignatures
        
      },

      async getNftMetadataModel ({ state }, metadata) {
        //Only fetch if it is metadata
        if(metadata.model == "metadata"){
            try {
            const { metaplex } = useWorkspace();
            const _nft = await metaplex.value
                .nfts()
                .load({ metadata })
                .run()
                
            state.nftsMapped[_nft.mint.address.toBase58()] = _nft
            } catch {
                
            }
        }
      },

      async getNftFromMintAddress({ state, dispatch }, mintAddress){
        const { metaplex } = useWorkspace()
        const nft = await metaplex.value.nfts().findByMint({ mintAddress }).run();
        const key = nft.mint.address.toBase58()
        if(!state.nftsAddresses.includes(key)){
          state.nftsAddresses.push(key)
        }
        state.nftsMapped[key] = nft
        dispatch("getNftTransactions", nft)
      },

      async getNftFromCreator(store, loadMetadata = false) {
        const { metaplex } = useWorkspace()
        const { state }  = store
        const { publicKey } = getKeyPair()
        const nfts = await metaplex.value.nfts().findAllByOwner({ owner : publicKey }).run()
        nfts.forEach((nft) => {
          if(nft.uri != "" && nft.uri != null){
            const key = nft.mintAddress.toBase58()
            state.nftsMapped[key] = nft
            if(!state.nftsAddresses.includes(key)){
              state.nftsAddresses.push(key)
            }
            if(loadMetadata) {
              //If it loads metadata  in the same action fire it
              (async function(metadata) {
                store.dispatch("getNftMetadataModel", metadata)
                store.dispatch("getNftTransactions", metadata)
              })(nft)
            }
          }
        })
       },

       updateCandyMachine(store, candyMachine){
          const key = candyMachine.address.toBase58()
          store.state.candyMachinesMapped[key] = candyMachine
       },

       async getCandyMachines(store, mintAddress = undefined){
        const { state, getters }  = store
        const { metaplex } = useWorkspace();
        const { publicKey } = getKeyPair()
        if(!mintAddress || !(mintAddress in getters.candyMachinesMintMapped)){
          const candyMachines = await metaplex.value.candyMachines().findAllBy({ type: "wallet", publicKey: publicKey }).run();
          candyMachines.forEach((candyMachine) => {
            //Use the mint address
            //Alias the nft
            const key = candyMachine.address.toBase58()
            state.candyMachinesMapped[key] = candyMachine
            if(!state.candyMachinesAddresses.includes(key)){
              state.candyMachinesAddresses.push(key)
            }
          })
        }
       }
}