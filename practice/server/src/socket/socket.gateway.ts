import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io"

@WebSocketGateway()
export class SocketGateway 
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  findIPAddress(client: Socket) {
    const ip = client.handshake.address.split(':');
    const address = ip[ip.length -1];
    return address
  }

  afterInit(server: Server) {
    console.log('connected to socket');
  }

  //function that happenes on connection
  handleConnection(client: Socket) {
    const address = this.findIPAddress(client);
    this.wss.emit("received-connection" , {ip: address})
    console.log('connected with user: ', client.id, new Date(), "IP----", address);
  }

  handleDisconnect(client: Socket) {
    const address = this.findIPAddress(client);
    this.wss.emit("received-disconnection" , {address})
    console.log('disconnected with user: ', client.id);
  }


  @SubscribeMessage('get_IP')
  handlegetIP(client: Socket, data) {
    client.emit("get_IP", {ip: this.findIPAddress(client)});
    return;
  }

  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, {sender, content}) {
    client.emit("received-message", {ip: this.findIPAddress(client), sender, content});
    return;
  }
}
