import { IsNotEmpty } from 'class-validator';

export class ERC20Request {

  @IsNotEmpty()
  tokenAddress: string;

  @IsNotEmpty()
  ethAmount: string;
  
  @IsNotEmpty()
  tokenAmount: string;
  
}