import { Injectable, OnDestroy } from '@angular/core';
import { HttpTransportType, LogLevel } from '@microsoft/signalr';
import { ServerConnectionFactoryService } from './server-connection-factory.service';
import { ServerConnection } from './server-connection';

@Injectable({
  providedIn: 'root'
})
export class ServerProxyService implements OnDestroy {

  private serverConnection: ServerConnection;

  constructor(serverConnectionFactory: ServerConnectionFactoryService) {
    // You could also get these values from configuration
    this.serverConnection = serverConnectionFactory.create('http://localhost:5001/ServerHub');

    this.registerToServerEvents();

    this.serverConnection.start();
  }

  ngOnDestroy(): void {
    this.serverConnection.stop();
  }

  //#region Server Calls

  public add(num1: number, num2: number): Promise<number> {
    return this.serverConnection.sendAndReceive('Add', num1, num2);
  }

  //#endregion

  private registerToServerEvents(): void {
    // TODO : turn on all events here using ServerConnection.registerToServerEvent
  }
}
