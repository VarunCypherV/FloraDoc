import React from 'react';
import DynamicTyping from '../Components/dynamicTyping';
import ChatRoom from '../Components/chatRoom';
import AudioConference from '../Components/audioConference';
import VideoConference from '../Components/videoConference';

function AppointmentRoom() {

  return (
    <div>
      {/* <DynamicTyping/> */}
      <ChatRoom/>
      {/* <AudioConference/>
      <VideoConference/> */}
    </div>
  );
}

export default AppointmentRoom;
