import { Injectable } from '@angular/core';
import { ConstantValues } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  encryption(data:any){
   return CryptoJS.AES.encrypt(data, ConstantValues.EN_KEYS).toString();
  }

  decryption(data:any){
    return CryptoJS.AES.decrypt(data,ConstantValues.EN_KEYS).toString(CryptoJS.enc.Utf8);
  }
}
