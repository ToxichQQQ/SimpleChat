import React, { useState } from "react";
import { AuthPage } from "./components/AuthPage";
import { ChatRoom } from "./components/ChatRoom";
import io from "socket.io-client";
import { Route, Routes, useNavigate } from "react-router-dom";

const socket = io("https://evening-bayou-76191.herokuapp.com/");

function App() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");

  const handleConnectToRoom = (username, roomID) => {
    socket.emit("connect_room", roomID);
    navigate("/room");
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthPage
            username={username}
            setUsername={setUsername}
            roomID={roomID}
            setRoomID={setRoomID}
            handleConnect={handleConnectToRoom}
          />
        }
      />
      <Route
        path="/room"
        element={
          <ChatRoom username={username} roomID={roomID} socket={socket} />
        }
      />
    </Routes>
  );
}

export default App;
