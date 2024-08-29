import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import test from '../src/assets/test.mp4';

const MyVideoComponent = () => {
    const [playing, setPlaying] = useState(false);  // Set initial state to false
    const playerRef = useRef(null);  // Reference to the ReactPlayer component

    const handlePause = () => {
        setPlaying(false);  // Pause the video
    };

    const handlePlay = () => {
        setPlaying(true);  // Play the video
    };

    const handleStop = () => {
        setPlaying(false);  // Stop the video
        playerRef.current.seekTo(0);  // Reset the video to the beginning
    };

    return (
        <div>
            <ReactPlayer 
                ref={playerRef} 
                url={test}
                playing={playing} // Controls whether the video is playing
                controls={true}   // Show video controls
                width="100%"      
                height="100%"     
            />
            <div className='mt-3 flex space-x-2 justify-center'>
                <button className='bg-green-600 text-white px-4 py-2 rounded-lg' onClick={handlePlay}>Start</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handlePause}>Pause</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleStop}>Stop</button>
            </div>
        </div>
    );
};

export default MyVideoComponent;
