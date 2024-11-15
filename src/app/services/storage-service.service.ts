import { Injectable } from '@angular/core';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private encryptDecrypt:EncryptDecryptService) { }

  setItemWithExpiry(key: string, value: string, ttl: number): void {
    // Set the item in localStorage
    localStorage.setItem(key, this.encryptDecrypt.encryption(value));

    // Set a timeout to remove it after ttl (in milliseconds)
    setTimeout(() => {
      localStorage.removeItem(key);
      console.log(`${key} has been removed after ${ttl / 1000} seconds`);
    }, ttl);
  }

  getItem(key: string): string | null {
    const value = localStorage.getItem(key)
    if (value!=null) {
      return this.encryptDecrypt.decryption(value);
    }
    return null;
  }
}
