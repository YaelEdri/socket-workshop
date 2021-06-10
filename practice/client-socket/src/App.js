// import logo from './logo.svg';
import { SocketProvider } from "@hilma/socket.io-react";
import './App.css';
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <SocketProvider
        uri="http://192.168.0.185:8080"
        options={{
          transports: ["websocket"],
          token: "klklkl"
        }}
      >
        <Chat>

        </Chat>
      </SocketProvider>
    </div>
  );
}

export default App;
