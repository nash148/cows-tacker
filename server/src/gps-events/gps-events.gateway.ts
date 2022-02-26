import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GpsEventsService } from './gps-events.service';

@WebSocketGateway()
export class GpsEventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('GpsEventsGateway');

  constructor(private readonly gpsEventsService: GpsEventsService) {}
  
  afterInit(server: Server) {
    this.logger.log('Initialized');
    this.gpsEventsService.setSocketServer(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected`);
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }
}
