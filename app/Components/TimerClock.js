import React, { useState, useEffect, useRef } from 'react';
import Increment from './Increment';
import Decrement from './Decrement';

const CountdownTimer = ({ initialSeconds, isRunning, reset, onTimeUpdate }) => {
    const [time, setTime] = useState(initialSeconds);
    const holdTimer = useRef(null);

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

    const handleHoldStart = (action) => {
        let interval = 150; // Initial interval duration

        const accelerate = () => {
            action();
            interval = Math.max(interval * 0.9, 50); // Decrease interval duration but not below 50ms
            holdTimer.current = setTimeout(accelerate, interval);
        };

        accelerate();
    };

    const handleHoldEnd = () => {
        clearTimeout(holdTimer.current);
    };

    const DecrementHrsHandler = () => {
        if (time > 3600 && !isRunning)
            setTime((prev) => prev - 3600);
    };

    const DecrementMinsHandler = () => {
        if (time >= 60 && !isRunning)
            setTime((prev) => prev - 60);
    };

    const DecrementSecsHandler = () => {
        if (time > 0 && !isRunning)
            setTime((prev) => prev - 1);
    };

    const IncrementHrsHandler = () => {
        if (!isRunning)
            setTime((prev) => prev + 3600);
    };

    const IncrementMinsHandler = () => {
        if (!isRunning)
            setTime((prev) => prev + 60);
    };

    const IncrementSecsHandler = () => {
        if (!isRunning)
            setTime((prev) => prev + 1);
    };

    return (
        <>
            {!isRunning && (
                <>
                    {/* Increment */}
                    <div className='flex space-x-5 justify-between'>
                        <button
                            className=''
                            onMouseDown={() => handleHoldStart(IncrementHrsHandler)}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={() => handleHoldStart(IncrementHrsHandler)}
                            onTouchEnd={handleHoldEnd}
                        >
                            <Increment />
                        </button>
                        <button
                            className=''
                            onMouseDown={() => handleHoldStart(IncrementMinsHandler)}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={() => handleHoldStart(IncrementMinsHandler)}
                            onTouchEnd={handleHoldEnd}
                        >
                            <Increment />
                        </button>
                        <button
                            className=''
                            onMouseDown={() => handleHoldStart(IncrementSecsHandler)}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={() => handleHoldStart(IncrementSecsHandler)}
                            onTouchEnd={handleHoldEnd}
                        >
                            <Increment />
                        </button>
                    </div>
                </>
            )}
            <div className='cursor-default select-none'>
                <h1>{formatTime(time)}</h1>
            </div>
            {!isRunning && (
                <>
                    {/* Decrement */}
                    <div className='flex space-x-5 justify-between'>
                        <button
                            className=''
                            onMouseDown={() => handleHoldStart(DecrementHrsHandler)}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={() => handleHoldStart(DecrementHrsHandler)}
                            onTouchEnd={handleHoldEnd}
                        >
                            <Decrement />
                        </button>
                        <button
                            className=''
                            onMouseDown={() => handleHoldStart(DecrementMinsHandler)}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={() => handleHoldStart(DecrementMinsHandler)}
                            onTouchEnd={handleHoldEnd}
                        >
                            <Decrement />
                        </button>
                        <button
                            className=''
                            onMouseDown={() => handleHoldStart(DecrementSecsHandler)}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={() => handleHoldStart(DecrementSecsHandler)}
                            onTouchEnd={handleHoldEnd}
                        >
                            <Decrement />
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default CountdownTimer;
