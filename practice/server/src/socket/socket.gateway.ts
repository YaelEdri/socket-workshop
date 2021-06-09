import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io"

@WebSocketGateway()
export class SocketGateway 
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  findIPAddress(client: Socket) {
    return client.handshake.address
  }

  afterInit(server: Server) {
    console.log('connected to socket');
  }

  //function that happenes on connection
  handleConnection(client: Socket) {
    const address = this.findIPAddress(client);
    this.wss.emit("client-connect" , {address})
    console.log('connected with user: ', client.id, new Date(), "IP----", address);
  }

  handleDisconnect(client: Socket) {
    const address = this.findIPAddress(client);
    this.wss.emit("client-disconnect" , {address})
    console.log('disconnected with user: ', client.id);
    // this.wss.to(`${client.id}`).emit('disconnecting-to-socket')
  }


  @SubscribeMessage('message')
  handleMessage(client: Socket, data): string {
    return 'Hello world!';
  }
}
