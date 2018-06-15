import {soliditySHA3} from 'ethereumjs-abi';
import createKeccak = require('keccak');
import {data} from './serialize';
import * as Types from './types';

export function keccak256(message: Types.Data) {
  return (
    '0x' +
    createKeccak('keccak256')
      .update(Buffer.from(data(message).substring(2), 'hex'))
      .digest('hex')
  );
}

export function tightlyPackedKeccak256(
  inputTypes: string[],
  ...messages: any[]
) {
  return '0x' + soliditySHA3(inputTypes, messages).toString('hex');
}