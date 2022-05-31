import { Injectable } from '@nestjs/common';
import { AbiItem } from 'web3-utils';
import BN from 'bn.js';
import { makeBatchRequest } from 'web3-batch-request';
import { Web3Service } from '../web3/web3.service';
import voltAbi from '../common/abi/volt.json';
import { VOLT, SAFES } from '../common/constants';

@Injectable()
export class StatsService {
  web3: any;
  volt: any;
  constructor(private readonly web3Service: Web3Service) {
    this.web3 = this.web3Service.web3;
    this.volt = new this.web3.eth.Contract(voltAbi as AbiItem[], VOLT);
  }
  async getCirculatingSupply(): Promise<string> {
    const calls = SAFES.map((addr) => ({
      ethCall: this.volt.methods.balanceOf(addr).call,
    }));
    const balances = await makeBatchRequest(this.web3, calls);

    const vestedVoltInWei = balances
      .map((b: string) => this.web3.utils.toBN(b))
      .reduce(
        (acc: BN, balance: BN) => acc.add(balance),
        this.web3.utils.toBN(0),
      );
    const totalSupplyInWei = await this.volt.methods.totalSupply().call();

    const circulatingSupplyInWei = this.web3.utils
      .toBN(totalSupplyInWei)
      .sub(vestedVoltInWei);

    return this.web3.utils.fromWei(circulatingSupplyInWei);
  }
  async getTotalSupply(): Promise<string> {
    const totalSupplyInWei: string = await this.volt.methods
      .totalSupply()
      .call();
    return this.web3.utils.fromWei(totalSupplyInWei);
  }
}
