import { AudioOnIcon, AudioOffIcon, VideoOnIcon, VideoOffIcon } from '@/constants/icons';
import { use, useEffect, useRef, useState } from 'react';

function VideoCall({myId, otherId}) {
  const [peerId, setPeerId] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const mediaStreamRef = useRef(null); // store the media stream so that we can stop it later

  useEffect(() => {

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
            // check if there exists prior connection with other user
            if (peerInstance.current && peerInstance.current._connections[otherId]) { // todo: might not work
                console.log('already connected to ' + otherId);
                return;
            }

            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((mediaStream) => { // get video and audio stream from device, stream contains mult tracks
                mediaStreamRef.current = mediaStream;
                currentUserVideoRef.current.srcObject = mediaStream; // set video's srcObject to the stream
                currentUserVideoRef.current.onloadedmetadata = (e) => {
                  setIsVideoLoaded(true);
                  currentUserVideoRef.current.play().catch(console.error);
                };
                call.answer(mediaStream)
                call.on('stream', function(remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.onloadedmetadata = (e) => {
                      remoteVideoRef.current.play().catch(console.error);
                    }
                });
            })
            .catch((err) => {
                alert('Error getting user media: ' + err.message);
            });
        })

        peerInstance.current = peer;
    }

    return () => {
      if (mediaStreamRef.current) {
        // Stop all tracks in the media stream
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
        if (peerInstance.current) {
            peerInstance.current.destroy();
        }
    }
  }, [myId, otherId])

  useEffect(() => {
    console.log('isVideoLoaded', isVideoLoaded);
  }
  , [isVideoLoaded]);

  const call = (remotePeerId) => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        mediaStreamRef.current = mediaStream;
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.onloadedmetadata = (e) => {
          setIsVideoLoaded(true);
          currentUserVideoRef.current.play().catch(console.error);
        };

        applySavedState();

        const call = peerInstance.current.call(remotePeerId, mediaStream)

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.onloadedmetadata = (e) => {
            remoteVideoRef.current.play().catch(console.error);
          }
        })
    })
    .catch((err) => {
        alert('Error getting user media: ' + err.message);
    });
  }

  const applySavedState = () => {
    // Get saved video and audio state
    const savedVideoState = localStorage.getItem('videoState');
    const isVideoOn = savedVideoState !== null ? (savedVideoState == 'on') : true;
    const videoTracks = currentUserVideoRef.current.srcObject.getVideoTracks();
    videoTracks.forEach(track => {
      track.enabled = isVideoOn;
    });
    setIsVideoOn(isVideoOn);
    const savedAudioState = localStorage.getItem('audioState');
    const isAudioOn = savedAudioState !== null ? (savedAudioState == 'on') : true;
    const audioTracks = currentUserVideoRef.current.srcObject.getAudioTracks();
    audioTracks.forEach(track => {
        track.enabled = isAudioOn;
    });
    setIsAudioOn(isAudioOn);
    console.log('isVideoOn', isVideoOn);
    console.log('isAudioOn', isAudioOn);
  }

  const toggleAudio = () => {
    const tracks = currentUserVideoRef.current.srcObject.getAudioTracks();
    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle audio track
      localStorage.setItem('audioState', track.enabled ? 'on' : 'off');
      setIsAudioOn(track.enabled);
    });
  };
  
  const toggleVideo = () => {
    const tracks = currentUserVideoRef.current.srcObject.getVideoTracks();
    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle video track
      localStorage.setItem('videoState', track.enabled ? 'on' : 'off');
      setIsVideoOn(track.enabled);
    });
  };
  

  return (
    <div className="flex-col p-4">
      {/* <h1>Current user id is {peerId}</h1> */}
      {/* <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button> */}
      <video playsInline muted ref={currentUserVideoRef} className="w-auto rounded-lg" />
      {!isVideoLoaded ? null :
        <div className='flex gap-2'>
          <button onClick={toggleAudio}>
            {isAudioOn ? <AudioOnIcon /> : <AudioOffIcon />}
          </button>
          <button onClick={toggleVideo}>
            {isVideoOn ? <VideoOnIcon /> : <VideoOffIcon />}
          </button>
        </div>
      }
      <video playsInline ref={remoteVideoRef} autoPlay className="w-auto rounded-lg" />
      {/* playsInline: dont play fullscreen on ios, autoPlay: play upon load */}
    </div>
  );
  
}

export default VideoCall;