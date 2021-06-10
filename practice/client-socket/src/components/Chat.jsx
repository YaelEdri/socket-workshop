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
        { type: 'message', ip: '192.168.0.185', content: 'jvfodjif', sender: 'יעל', date: '19:03' },
        { type: 'connection', ip: '192.168.0.74', action: 'disconnect' },
    ]);
    const [ipAddress, setIpAddress] = useState('')
    const [input, setInput] = useState("");
    const socket = useSocket();

    useEffect(() => {
        if (!localStorage.getItem('name')) {
            getUserName()
        }
    }, [])

    useEffect(() => {
        // they need to do:
        socket.on("connect", () => {
            console.log("connected");
            socket.emit('get_IP')
        });

        socket.on("received_connect", (data) => {
            console.log('data: ', data);
            addConnectionMessage(data, "connect")

        })

        socket.on("received_disconnect", (data) => {
            addConnectionMessage(data, "disconnect")
        })

        socket.on("reconnect_error", () => {
            console.log("reconnect_error");
        });

        socket.on('get_IP', ({ ip }) => {
            if (!ip) socket.emit("get_IP")
            else setIpAddress(ip)
        })

        socket.on("received_message", (data) => {
            addMessage(data)
        })

        return () => {
            socket.off("connect");
            socket.off("reconnect_error");
            socket.off("get_IP");
            socket.off("received_message");
            socket.off("eceived_disconnect");
            socket.off("received_connect");
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        scrollToNewMessage(messages[messages.length - 1].id)
    }, [messages])

    useEffect(() => {
        console.log('ipAddress: ', ipAddress);
    }, [ipAddress])

    function getUserName() {
        let userName;
        while (!userName) {
            userName = prompt("enter your name:");
        }
        localStorage.setItem('name', userName)
    }

    function onChange(e) {
        const { value } = e.target;
        setInput(value);
    }

    function sendMessage() {
        // send socket
        socket.emit("send_message",
            {
                content: input,
                sender: localStorage.getItem('name'),
                date: currentTime()
            })
        setInput("")
    }

    function currentTime() {
        const date = new Date()
        return date.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })
    }

    function handleKeyDown({ which }) {
        if (which !== 13) return
        sendMessage();
    }

    function addConnectionMessage({action, ip, id}) {
        const message = {
            id,
            type: "connection",
            action,
            ip,
        }
        setMessages(prev => {
            return [...prev, message]
        })
    }

    function addMessage({ ip, date, content, sender, id }) {
        const message = {
            id,
            type: "message",
            ip,
            sender,
            date,
            content
        }
        setMessages(prev => {
            return [...prev, message]
        })
    }

    const scrollToNewMessage = (id) => {
        const el = document.getElementById(String(id))
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
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
                    <IconButton onClick={sendMessage}>
                        <SendIcon className='send-icon' />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
export default Chat