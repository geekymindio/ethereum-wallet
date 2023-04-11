import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider('goerli', '5e7f6cc7e0824efe80b3a295c5556845')



export const createWallet = async (password) => {
    return new Promise(async (resolve, reject) => {
        const wallet = ethers.Wallet.createRandom()
        const json = await wallet.encrypt(password).then((value) => {
            return value
        });
  
        if(json) {
            downloadWallet(json)    
            resolve(json)
        } 

        reject('failed')
    })
}



export const getBalance = async (address) => {
    return await provider.getBalance(address).then( async (balance) => {
       return ethers.utils.formatEther(balance)
    })
}


export const getTransactions = async (privateKey, address) => {
    return await provider.getHistory(address)
}


export const sendNewTransaction = async (privateKey, address, amount) => {

    const wallet = new ethers.Wallet(privateKey, provider)

    const tx = await wallet.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount.toString())
    })

    return tx
}

const downloadWallet = (keystore) => {
    const blob = new Blob([keystore], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "keystore.json"
    link.click()
    URL.revokeObjectURL(link.href)
}
