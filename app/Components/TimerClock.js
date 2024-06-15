import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialSeconds, isRunning, reset, onTimeUpdate }) => {
    const [time, setTime] = useState(initialSeconds);

    useEffect(() => {
        setTime(initialSeconds);
    }, [reset, initialSeconds]);

    useEffect(() => {
        let timerId;

        if (isRunning && time > 0) {
            timerId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        

        return () => clearInterval(timerId);
    }, [isRunning, time]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          onTimeUpdate(time); // Send the current time to the parent component with a 1-second delay
        }, 1000);
    
        return () => clearTimeout(timeoutId); // Clean up the timeout on unmount or time change
      }, [time, onTimeUpdate]);

    return (
        <>
            <div>
                <h1>{formatTime(time)}</h1>
            </div>
        </>
    );
};

export default CountdownTimer;
