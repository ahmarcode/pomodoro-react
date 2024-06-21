"use client";
import React, { useEffect, useState } from 'react';

const Stopwatch = ({ isRunning, reset, setReset }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (reset) {
            setTime(0);
        }
    }, [reset]);

    useEffect(() => {
        let timerId;

        if (isRunning) {
            timerId = setInterval(() => {
                setTime((prevTime) => prevTime + 0.01);
            }, 10); // Update every 10 milliseconds
        }

        return () => clearInterval(timerId);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        const mili = Math.floor((seconds * 100) % 100).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}.${mili}`;
    };


    return (
        <div className='cursor-default select-none'>
            <h1>{formatTime(time)}</h1>
        </div>
    );
};

export default Stopwatch;
