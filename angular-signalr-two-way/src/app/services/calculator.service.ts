import { Injectable } from '@angular/core';
import { ServerProxyService } from '../communication/server-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private serverProxy: ServerProxyService) {

  }

  public add(num1: number, num2: number): Promise<number> {
    return this.serverProxy.add(num1, num2);
  }
}
