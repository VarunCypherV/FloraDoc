import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function ChatRoom() {
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // State to store messages
  const [userId, setUserId] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    // Clear the message input field
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Add the received message to the messages list with the sender's ID
      const receivedMessage = { text: data.message, sender: data.senderId };
      setMessages([...messages, receivedMessage]);
    });

    // Listen for user connection event and update the userId state
    socket.on("connect", () => {
      setUserId(socket.id);
    });

    // ...
  }, [messages]);

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Messages:</h1>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender === userId ? "You" : msg.sender}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
