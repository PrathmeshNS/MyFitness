import { Injectable } from '@angular/core';
import { ConstantValues } from '../constant/Constant';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  encryption(data: string) {
    try {
      return CryptoJS.AES.encrypt(data, ConstantValues.EN_KEYS).toString();
    }
    catch (e) {
      console.log(e)
      return ""
    }
  }

  
  decryption(data: any) {
    try {
      const pass = CryptoJS.AES.decrypt(data, ConstantValues.EN_KEYS)
      return pass.toString(CryptoJS.enc.Utf8)
    }
    catch (e) {
      console.log(e)
      return ""
    }
  }

}
