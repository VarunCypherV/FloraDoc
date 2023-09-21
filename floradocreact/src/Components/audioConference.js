import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';


function App() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteAudioRef = useRef(null);
  const currentUserAudioRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ audio: true }, (mediaStream) => {
        currentUserAudioRef.current.srcObject = mediaStream;
        currentUserAudioRef.current.play();
        call.answer(mediaStream);
        call.on('stream', function (remoteStream) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play();
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ audio: true }, (mediaStream) => {
      currentUserAudioRef.current.srcObject = mediaStream;
      currentUserAudioRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on('stream', (remoteStream) => {
        remoteAudioRef.current.srcObject = remoteStream;
        remoteAudioRef.current.play();
      });
    });
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input type="text" value={remotePeerIdValue} onChange={(e) => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <audio ref={currentUserAudioRef} />
      </div>
      <div>
        <audio ref={remoteAudioRef} />
      </div>
    </div>
  );
}

export default App;
