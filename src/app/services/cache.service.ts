import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public lang: string;
  public racesData: Array<any>;
  private currentVal: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {

  }

  async updateNetworkStatus(val: string) {
    this.currentVal.next(val);
  }

  onCurrentValChange(): Observable<string> {
    return this.currentVal.asObservable();
  }

  getCurrentValStatus(): string {
    return this.currentVal.getValue();
  }
}
