import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  setItemWithExpiry(key: string, value: string, ttl: number): void {
    // Set the item in localStorage
    localStorage.setItem(key, value);

    // Set a timeout to remove it after ttl (in milliseconds)
    setTimeout(() => {
      localStorage.removeItem(key);
      console.log(`${key} has been removed after ${ttl / 1000} seconds`);
    }, ttl);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
