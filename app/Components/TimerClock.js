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

    const DecrementHrsHandler = () => {
        if(time > 3600)
        setTime(time - 1*60*60);
     };
    const DecrementMinsHandler = () => { 
        if(time > 60)
        setTime(time - 1*60);
    };
    const DecrementSecsHandler = () => {
        if (time > 0)
        setTime(time - 1);
    }

    const IncrementHrsHandler = () => {
        setTime(time+1*60*60)
    };        
    const IncrementMinsHandler = () => {
        setTime(time+1*60)
    };    
    const IncrementSecsHandler = () => {
        setTime(time+1)
    };    
    return (
        <>
            <div className='flex space-x-5  justify-between'>
                <div className='' onClick={IncrementHrsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </div>
                <div className='' onClick={IncrementMinsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </div>
                <div className='' onClick={IncrementSecsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </div>
            </div>
            <div>
                <h1>{formatTime(time)}</h1>
            </div>
            <div className='flex space-x-5  justify-between'>
                <button className='' onClick={DecrementHrsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                </button>
                <button className='' onClick={DecrementMinsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                </button>
                <button className='' onClick={DecrementSecsHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default CountdownTimer;
