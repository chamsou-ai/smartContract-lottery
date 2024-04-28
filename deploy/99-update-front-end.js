const { ethers, network } = require("hardhat");
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE = "../nextjs-lottery/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-lottery/constants/abi.json"

module.exports = async function(){
    if(process.env.UPDATE_FRONT_END){
        console.log("Updating front end ...");
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi(){
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE , JSON.stringify(raffle.interface.fragments))

}

async function updateContractAddresses(){
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE,"utf8"))
    if(chainId in currentAddresses){
        if(!currentAddresses[chainId].includes(raffle.target)){
            currentAddresses[chainId].push(raffle.target)
        }
    }{
        currentAddresses[chainId] = [raffle.target]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE,JSON.stringify(currentAddresses))
}

module.exports.tags = ["all","frontend"]