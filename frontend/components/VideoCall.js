import { useEffect, useRef, useState } from 'react';

function VideoCall({myId, otherId}) {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {

    console.log('myId', myId);
    console.log('otherId', otherId);

    if (typeof window !== 'undefined' && myId && otherId) {
        const Peer = require('peerjs').default; // Import PeerJS here
    
        const peer = new Peer(myId, {
            host: '/',
            port: '4001',
        }); // where peerjs server is hosted 

        peer.on('open', (id) => {
            setPeerId(id)
            call(otherId);
        });

        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function(remoteStream) {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
                });
            });
        })

        peerInstance.current = peer;
    }
  }, [myId, otherId])

  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });
  }

  const toggleAudio = () => {
    const tracks = currentUserVideoRef.current.srcObject.getAudioTracks();
    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle audio track
    });
  };
  
  const toggleVideo = () => {
    const tracks = currentUserVideoRef.current.srcObject.getVideoTracks();
    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle video track
    });
  };
  

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video playsInline muted ref={currentUserVideoRef} />
        <button onClick={toggleAudio}>Toggle Audio</button>
        <button onClick={toggleVideo}>Toggle Video</button>
      </div>
      <div>
        <video playsInline ref={remoteVideoRef} autoPlay />
      </div>
    </div>
  );
  
}

export default VideoCall;