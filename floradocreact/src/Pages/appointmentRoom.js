import React, { useState } from "react";
import ChatRoom from "../Components/chatRoom";
import AudioConference from "../Components/audioConference";
import VideoConference from "../Components/videoConference";
import Header from "../Components/header";
import Footer from "../Components/footer";
import styled from "styled-components";

function AppointmentRoom() {
  const [activeWindow, setActiveWindow] = useState("chat");

  const handleToggle = (window) => {
    setActiveWindow(window);
  };

  const autoResize = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  };

  return (
    <>
      <Header />
      <div className="sign page-container">
        <div className="card">
          <form className="entry" onSubmit={handleSubmit}>
            <RoomContainer>
              <div className="button-container">
                <div
                  className="secondary-button"
                  onClick={() => handleToggle("audio")}
                >
                  Audio
                </div>
                <div
                  className="secondary-button"
                  onClick={() => handleToggle("video")}
                >
                  Video
                </div>
                <div
                  className="secondary-button"
                  onClick={() => handleToggle("chat")}
                >
                  Chat
                </div>
              </div>
              <LeftPane>
                {activeWindow === "audio" && <AudioConference />}
                {activeWindow === "video" && <VideoConference />}
                {activeWindow === "chat" && <ChatRoom />}
              </LeftPane>
            </RoomContainer>
          </form>
          <form className="entry" onSubmit={handleSubmit}>
            <Diagnosis
              placeholder="Enter diagnosis here"
              onInput={autoResize}
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppointmentRoom;

const Diagnosis = styled.textarea`
  color: black;
  font-family: "Courier", sans-serif;
  width: 100%;
  border: 1px solid black;
  background-color: transparent;
  font-size: 1em;
  padding: 1em;
  resize: none;
  overflow: hidden;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
`;

const LeftPane = styled.div`
  padding: 5em;
`;
