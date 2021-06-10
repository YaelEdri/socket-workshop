import React, { useEffect, useState } from 'react';
import { useSocket } from '@hilma/socket.io-react';
import MessageCard from "./MessageCard";
import ConnectCard from "./ConnectCard";
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core'
import "../styles/chat.scss";

const Chat = () => {
    const [messages, setMessages] = useState([
        { type: 'connection', ip: '192.168.0.74', action: 'connect' },
        { type: 'message', ip: '192.168.0.47', content: 'kcdsmzckld', sender: 'שחר', date: '19:00' },
        { type: 'message', ip: '192.168.0.74', content: 'kcdsmzckld mdlsmcvkldszmckdszmlk mcsl;zmvkzlsmcd', sender: 'כנה', date: '19:01' },
        { type: 'message', ip: '192.168.0.185', content: 'jvfodjif', sender: 'יעל', date: '19:03' },
        { type: 'connection', ip: '192.168.0.74', action: 'disconnect' },
    ]);
    const [ipAddress, setIpAddress] = useState('')
    const socket = useSocket();

    useEffect(() => {
        socket.on("connect", (message) => {
            console.log("connected");
            socket.emit('get_IP')
        });

        socket.on("reconnect_error", () => {
            console.log("reconnect_error");
        });

        socket.on('get_IP', ({ ip }) => {
            setIpAddress(ip)
        })

        return () => {
            socket.off("connect");
            socket.off("reconnect_error");
            socket.off("get_IP");
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log('ipAddress: ', ipAddress);
    }, [ipAddress])

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message, i) =>
                    message.type === 'connection' ?
                        <ConnectCard
                            key={i}
                            isMe={ipAddress === message.ip}
                            {...message} /> :
                        <MessageCard
                            key={i}
                            isMe={ipAddress === message.ip}
                            {...message} />
                )}
            </div>

            <div className="input">
                <input type="text" placeholder="הקלד/י הודעה..." />
                <div className="send">
                    <IconButton>
                        <SendIcon className='send-icon' />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
export default Chat