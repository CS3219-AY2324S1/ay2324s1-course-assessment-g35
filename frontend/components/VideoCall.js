import { useEffect, useRef, useState } from 'react';

function VideoCall({myId, otherId}) {
  const [peerId, setPeerId] = useState('');
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

    return () => {
        if (peerInstance.current) {
            peerInstance.current.destroy();
        }
    }
  }, [myId, otherId])

  const call = (remotePeerId) => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      // Get saved video and audio state
      const savedVideoState = localStorage.getItem('videoState');
      const isVideoOn = savedVideoState !== null ? (savedVideoState == 'on') : true;
      console.log('isVideoOn', isVideoOn);
      const videoTracks = currentUserVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isVideoOn;
      });
      const savedAudioState = localStorage.getItem('audioState');
      const isAudioOn = savedAudioState !== null ? (savedAudioState == 'on') : true;
      console.log('isAudioOn', isAudioOn);
      const audioTracks = currentUserVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
          track.enabled = isAudioOn;
      });

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
      localStorage.setItem('audioState', track.enabled ? 'on' : 'off');
    });
  };
  
  const toggleVideo = () => {
    const tracks = currentUserVideoRef.current.srcObject.getVideoTracks();
    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle video track
      localStorage.setItem('videoState', track.enabled ? 'on' : 'off');
    });
  };
  

  return (
    <div className="flex-col">
      <h1>Current user id is {peerId}</h1>
      {/* <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button> */}
      <video playsInline muted ref={currentUserVideoRef} className="w-auto rounded-lg" />
      <div>
        <button onClick={toggleAudio}>Toggle Audio</button>
        <button onClick={toggleVideo}>Toggle Video</button>
      </div>
      <video playsInline ref={remoteVideoRef} autoPlay className="w-auto rounded-lg" />
      {/* playsInline: dont play fullscreen on ios, autoPlay: play upon load */}
    </div>
  );
  
}

export default VideoCall;