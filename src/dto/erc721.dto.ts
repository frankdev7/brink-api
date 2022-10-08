import { IsNotEmpty } from 'class-validator';

export class ERC721Request {

  @IsNotEmpty()
  tokenAddress: string;

  @IsNotEmpty()
  nftAddress: string;

  @IsNotEmpty()
  tokenAmount: number;
  
}