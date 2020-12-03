import { IHttpConnectionOptions, LogLevel } from '@microsoft/signalr';

export interface ServerConnectionOptions {
	url: string;
	logLevel: LogLevel;
	httpConnectionOptions?: IHttpConnectionOptions;
}