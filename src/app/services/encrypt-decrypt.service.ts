import { Injectable } from '@angular/core';
import { ConstantValues } from '../constant/Constant';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  encryption(data: string) {
    return CryptoJS.AES.encrypt(data, ConstantValues.EN_KEYS).toString();
  }

  decryption(data: string) {
    return CryptoJS.AES.decrypt(data, ConstantValues.EN_KEYS).toString(CryptoJS.enc.Utf8)
  }

}
