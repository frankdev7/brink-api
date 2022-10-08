import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ERC20Request } from './dto/erc20.dto';
import { ERC721Request } from './dto/erc721.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @Post("/createLimitERC20")
  createOrderLimitERC20(@Body() erc20Request: ERC20Request): void {
    this.appService.createOrderLimitERC20(erc20Request);
  }

  @Post("/createLimitERC721")
  createOrderLimitERC721(@Body() erc721Request: ERC721Request): void {
    this.appService.createOrderLimitERC721(erc721Request);
  }

}
