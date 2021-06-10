import React, { useEffect, useState } from 'react';
import { useSocket } from '@hilma/socket.io-react';
import MessageCard from "./MessageCard";
import ConnectCard from "./ConnectCard";
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core'
import "../styles/chat.scss";

// events to do:
//     emit: "send-m"
//     on: "connect", "disconnect", "received-m", "received-c", "received-d"
//     off: to all the on events

// data to receive: name, ip, message

const Chat = () => {
    // delete!
    const [messages, setMessages] = useState([
        { type: 'connection', ip: '192.168.0.74', action: 'connect' },
        { type: 'message', ip: '192.168.0.47', content: 'kcdsmzckld', sender: 'שחר', date: '19:00' },
        { type: 'message', ip: '192.168.0.74', content: 'kcdsmzckld mdlsmcvkldszmckdszmlk mcsl;zmvkzlsmcd', sender: 'כנה', date: '19:01' },
        { type: 'message', ip: '', content: 'jvfodjif', sender: 'יעל', date: '19:03' },
        { type: 'connection', ip: '192.168.0.74', action: 'disconnect' },
    ]);
    const [ipAddress, setIpAddress] = useState('')
    const [name, setName] = useState("");
    const [input, setInput] = useState("");
    const socket = useSocket();

    useEffect(() => {
        // const userName = prompt("rour name");
        // setName(userName);

        // they need to do:
        socket.on("connect", () => {
            console.log("connected");
            socket.emit('get_IP')
        });

        socket.on("reconnect_error", () => {
            console.log("reconnect_error");
        });

        socket.on('get_IP', ({ ip }) => {
            if (!ip) socket.emit("get_IP")
            else setIpAddress(ip)
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

    function onChange(e) {
        const { value } = e.target;
        setInput(value);
    }

    function sendMessage() {
        // send socket
    }

    function handleKeyDown({ which }) {
        if (which !== 13) return
        sendMessage();
    }

    function addConnectionMessage(action, date, ip) {
        const message = {
            type: "connection",
            action,
            ip,
            date
        }
        setMessages(prev => {
            return [...prev, message]
        })
    }

    function addMessage(ip, date, content) {
        const message = {
            type: "message",
            ip,
            sender: name,
            date,
            content
        }
        setMessages(prev => {
            return [...prev, message]
        })
    }
    
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
                <input type="text" placeholder="הכנס הודעה" onChange={onChange} value={input || ""} onKeyDown={handleKeyDown} />
                <div className="send">
                    <IconButton>
                        <SendIcon className='send-icon' onClick={sendMessage} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
export default Chat