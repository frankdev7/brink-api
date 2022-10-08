import { Injectable } from '@nestjs/common';
import { ERC20Request } from './dto/erc20.dto';
import { ERC721Request } from './dto/erc721.dto';
const { ethers } = require('ethers')
const brinkSDK = require('@brinkninja/sdk')
const BN = ethers.BigNumber.from;
require("dotenv").config();

@Injectable()
export class AppService {

  constructor() {
  }

  async createOrderLimitERC20(erc20Request: ERC20Request) {
    console.log("REQUEST");
    console.log(erc20Request);
    const network = process.env.ETHEREUM_NETWORK;
    const provider = new ethers.providers.InfuraProvider(
      network,
      process.env.INFURA_API_KEY
    );
    const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
    const brinkSigner = brinkSDK.accountSigner(signer, network);
    
    const signedEthToToken = await brinkSigner.signEthToToken(
      BN(0), // bitmapIndex
      BN(1), // bit
      erc20Request.tokenAddress, // tokenAddress
      BN(erc20Request.ethAmount), // ethAmount
      BN(erc20Request.tokenAmount), // tokenAmount
      process.env.MAX_UINT256 // expiryBlock
    );

    console.log('')
    console.log('signedEthToToken')
    console.log(JSON.stringify(signedEthToToken))
  }

  async createOrderLimitERC721(erc721Request: ERC721Request) {
    console.log("REQUEST");
    console.log(erc721Request);

  }
}
