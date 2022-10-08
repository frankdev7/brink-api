import { Injectable } from '@nestjs/common';
import { ERC20Request } from './dto/erc20.dto';
import { ERC721Request } from './dto/erc721.dto';
const { ethers } = require('ethers')
const brinkSDK = require('@brinkninja/sdk')
const BN = ethers.BigNumber.from;
const axios = require('axios').default;

require("dotenv").config();

@Injectable()
export class AppService {

  constructor() {
  }

  async createOrderLimitERC20(erc20Request: ERC20Request) {
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
    console.log('signedEthToToken');
    console.log(JSON.stringify(signedEthToToken));
  }

  async createOrderLimitERC721(erc721Request: ERC721Request) {
    const network = process.env.ETHEREUM_NETWORK;
    const provider = new ethers.providers.InfuraProvider(
      network,
      process.env.INFURA_API_KEY
    );
    const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
    const brinkSigner = brinkSDK.accountSigner(signer, network);
    const signedMKRToNFT = await brinkSigner.signTokenToNft(
      BN(10), // bitmapIndex
      BN(1), // bit
      erc721Request.tokenAddress, // tokenAddress
      erc721Request.nftAddress, // ethAmount
      BN(erc721Request.tokenAmount), // tokenAmount
      process.env.MAX_UINT256 // expiryBlock
    );
    console.log('')
    console.log('signedMKRToNFT');
    console.log(JSON.stringify(signedMKRToNFT));

    try {
      const response = await axios.post(
        'https://api-v2.brink.trade/submit_message', 
        signedMKRToNFT
      );
      console.log(response);
    } catch (e) {
      console.log(e)
    }
  }
}
