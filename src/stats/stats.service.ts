import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import voltAbi from './voltAbi';

const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.fuse.io/'));
const VOLT = '0x34Ef2Cc892a88415e9f02b91BfA9c91fC0bE6bD4'.toLowerCase();
const volt = new web3.eth.Contract(voltAbi, VOLT);

const safes = [
  '0x03709784c96aeaAa9Dd38Df14A23e996681b2C66', // DAO
  '0x9714d5a8C58AecAFFEAEe3E5636cce879C36DC44', // Partnerships / Liquidity
  '0xE3CC255182Bb6488277F7462EC763aaF725bdF0D', // Dev Fund
  '0x1F325F94686121D8E944B7D3A359Da1Cf87de0C6', // Team and Advisor
  '0xF6731032d612596977aed46CBC9837Ec66251806', // Fundraise
  '0x57bAaaD96BA5Fca62c7eD3938FC3bc5295eBf348', // Foundation
  '0xcEee598bE82575762CeDe1c710F86cb733314B65', // Airdrop
  '0xBeB4c2ab9Ae1d93e5270E77C487D8588C42c0C15', // Vesting
  '0xe67C19AeC0436DcE03E2420d5361027eB233af3B', // Investor Vesting
  '0x145D8289dAc99a0919AB2F6EFb2621a65fF770B1', // Ola
].map((s) => s.toLowerCase());

@Injectable()
export class StatsService {
  async getCirculatingSupply(): Promise<string> {
    const balances = await Promise.all(
      safes.map((addr) => volt.methods.balanceOf(addr).call()),
    );

    const vestedVoltInWei = balances
      .map((b) => web3.utils.toBN(b))
      .reduce((acc, balance) => acc.add(balance), web3.utils.toBN(0));
    const totalSupplyInWei = await volt.methods.totalSupply().call();

    const circulatingSupply = web3.utils
      .toBN(totalSupplyInWei)
      .sub(vestedVoltInWei);

    return web3.utils.fromWei(circulatingSupply);
  }
  async getTotalSupply(): Promise<string> {
    const totalSupplyInWei = await volt.methods.totalSupply().call();
    return web3.utils.fromWei(totalSupplyInWei);
  }
}
