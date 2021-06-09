// import logo from './logo.svg';
import { SocketProvider } from "@hilma/socket.io-react";
import './App.css';
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <SocketProvider
        uri="http://localhost:8080"
        options={
            {
              transports: ["websocket"],
              token: "klklkl"
            }
        }
      >
        <header className="App-header">
          {/* <p>
            React Socket Chat
          </p> */}
          <Chat>

          </Chat>
        </header>

    </SocketProvider>
    </div>
  );
}

export default App;
