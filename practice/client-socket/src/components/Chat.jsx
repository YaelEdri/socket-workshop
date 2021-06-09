import React, { useEffect, useState } from 'react';
import { useSocket } from '@hilma/socket.io-react';
import MessageCard from "./MessageCard";
import ConnectCard from "./ConnectCard";
import "../styles/chat.scss";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        socket.on("connect", (message) => {
            console.log("connected");
        });

        socket.on("reconnect_error", () => {
            console.log("reconnect_error");
        });

        return () => {
            socket.off("connect");
            socket.off("reconnect_error");
        }
    }, []);
    
    return (
        <div className="chat-container">
            
        </div>
    )
}
export default Chat