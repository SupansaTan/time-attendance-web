import { Injectable } from '@angular/core';
import { LocalStorageModel } from '../model/localStorage.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get<Type>(key: string): Type | null {
    let result = null;
    let typeGetValue = localStorage.getItem(key);
    if (typeGetValue != null) {
      try {
        result = (JSON.parse(typeGetValue) as Type);
      } catch (error) {
        result = (<Type><unknown>typeGetValue);
      }
    }
    return result;
  }

  set<Type>(key: string, value: Type): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setBulk(keyPairsSet: Array<LocalStorageModel>): void {
    keyPairsSet.forEach(item => this.set(item.Key, item.Value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  removeAll(): void {
    localStorage.clear();
  }
}
