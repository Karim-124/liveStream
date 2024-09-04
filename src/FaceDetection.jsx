import React, { useEffect, useState } from 'react';

function FaceDetection() {
    const [image, setImage] = useState(null);
    const [facesCount, setFacesCount] = useState(0);
    const [prevFacesCount, setPrevFacesCount] = useState(null); // Track previous count
    const [connectionStatus, setConnectionStatus] = useState('Connecting...'); // Connection status

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8001/ws/face_detection/');

        socket.onopen = () => setConnectionStatus('Connected');
        socket.onclose = () => setConnectionStatus('Disconnected');
        socket.onerror = () => setConnectionStatus('Error');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setImage(`data:image/jpeg;base64,${data.image}`); // Display video frame

            // Update faces count only if it changes
            if (data.faces_count !== prevFacesCount) {
                setFacesCount(data.faces_count);
                setPrevFacesCount(data.faces_count); // Update previous count
                console.log(data.faces_count)
            }
        };

        return () => socket.close(); // Cleanup on component unmount
    }, [prevFacesCount]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Face Detection</h1>
            <p className="text-sm">{connectionStatus}</p> {/* Display connection status */}
            <p>Faces Detected: {facesCount}</p>
            {image && <img src={image} alt="Face Detection" />}
        </div>
    );
}

export default FaceDetection;
