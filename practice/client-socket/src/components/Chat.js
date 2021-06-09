import { useSocket } from '@hilma/socket.io-react'
import React, {useEffect, useContext} from 'react'
// import  

const Chat = () => {
    const socket = useSocket();
    // console.log('socket: ', socket);

    useEffect(() => {
        // socket.join(chatId, (err) => {
        //     if (err) console.log("failed to join room");
        // });

        socket.on("connect", (message) => {
            console.log("connected");
        });
    }, []);
    
    return (
        <div>
            
        </div>
    )
}
export default Chat