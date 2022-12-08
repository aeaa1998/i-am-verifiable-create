export default {
    state: {
        nftsMapped: {},
        nftsAddresses: [],
        candyMachinesMapped: {},
        candyMachinesAddresses: [],
        nftTransactionsMapped: {}
    },
    getters: {
        nftTransactionsMapped: (state, getters) =>  state.nftTransactionsMapped,
        nfts: (state, getters) =>  state.nftsAddresses.reduce((acc, nft) => [...acc, state.nftsMapped[nft]], []).filter(nft => nft.uri != ""),
        nftsMapped: (state, getters) =>  state.nftsMapped,
        // Only get the nfts not the metadata addresses
        nftsModels: (state, getters) =>  getters.nfts.filter(nft => nft.model != "metadata" && nft.uri != "" && nft.json && nft.json.model == "credential" && nft.collection == null),
        candyMachinesMapped: (state) => state.candyMachinesMapped,
        candyMachinesAddresses: (state) => state.candyMachinesAddresses,
        candyMachines: (state) => state.candyMachinesAddresses.reduce((acc, c) => [...acc, state.candyMachinesMapped[c]], []).filter((candyMachine) => {
            return candyMachine.itemsRemaining.toString() != '0'
          }),
        candyMachinesMintMapped: (state, getters) => getters.candyMachines
        .reduce((acc, candyMachine) => {
            const key = candyMachine.collectionMintAddress.toBase58()
            acc[key] = [...(acc[key] ?? []), candyMachine]
            return acc
        }, {}),
        dependenciesMapped: (state, getters) => getters.nftsModels
        .reduce((acc, nft) => {
            const requisites = (nft.json.requisites ?? [])
            requisites.forEach(req => {
                if(!(req in acc)){
                    acc[req] = []
                }
                acc[req].push(nft)
            })
            return acc
        }, {})
    }
    
}