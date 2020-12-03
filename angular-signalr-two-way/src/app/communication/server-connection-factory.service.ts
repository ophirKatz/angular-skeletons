import { Injectable } from '@angular/core';
import { ServerConnection } from './server-connection';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionFactoryService {

  constructor() { }

  public create(url: string): ServerConnection {
    return new ServerConnection(url);
  }

}
