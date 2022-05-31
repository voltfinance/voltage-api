import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  public web3: any;
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('https://rpc.fuse.io/'),
    );
  }
}
