import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class ServerConnection {

  private hubConnection: HubConnection;
  private serverEvents: string[];

  constructor(url: string) {
    // You could also get these values from configuration
    this.hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(url, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.onclose(() => {
      console.log('Connection was closed')
    });
  }

  public async start(): Promise<void> {
    await this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public stop(): void {
    this.serverEvents.forEach(event => this.hubConnection.off(event));
    this.hubConnection.stop();
  }

  public registerToServerEvent(methodName: string, newMethod: (...args: any[]) => void): void {
    this.hubConnection.on(methodName, newMethod);
    this.serverEvents.unshift(methodName);
  }

  public send(methodName: string, ...args: any[]): void {
    this.hubConnection.send(methodName, ...args);
  }

  public receive<T>(methodName: string): Promise<void> {
    return this.hubConnection.invoke(methodName);
  }

  public sendAndReceive<T>(methodName: string, ...args: any[]): Promise<T> {
    return this.hubConnection.invoke(methodName, ...args);
  }

}
