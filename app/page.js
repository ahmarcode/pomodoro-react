"use client";
import React, { useEffect, useState } from 'react';
import TimerClock from './Components/TimerClock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(5); // You can change this to any initial value you want
  const [currentTime, setCurrentTime] = useState(initialSeconds);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetHandler = () => {
    setIsRunning(false); // Stop the timer
    setReset((prevReset) => !prevReset); // Toggle the reset state to trigger the effect
    toast.info("Timer Reset Successfull");
  };

  const shortTimeHandler = () => {
    if (isRunning && currentTime !== 0) {
      toast.warning("Timer is Already Running!!");
      toast.info("Reset for Next Session.");
    }
    else {
      setIsRunning(true);
      setInitialSeconds(1500);
      toast.success("25 Mins Timer Started.");
    }
  }

  const longTimeHandler = () => {
    if (isRunning && currentTime !== 0) {
      toast.warning("Timer is Already Running!!");
      toast.info("Reset for Next Session.");
    }
    else {
      setIsRunning(true);
      setInitialSeconds(3300);
      toast.success("55 Mins Timer Started.");
    }
  }

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  useEffect(() => {
    if (currentTime == 0 && isRunning) {
      toast.success("🚀 Session Completed!");
    }
  })

  const timerColor = currentTime ? "bg-purple-500 rounded-lg font-semibold text-5xl text-white text-center py-2 px-10" : "bg-red-500 rounded-lg font-semibold text-5xl text-white text-center py-2 px-10";

  return (<>
    <div className='bg-purple-400 min-h-svh flex flex-col justify-between items-center'>
      <ToastContainer theme='dark' stacked />
      <h1 className='text-purple-700 text-4xl font-bold'>Pomodoro</h1>

      {/* Timer */}
      <div className='flex items-center justify-center'>
        <h3 className={timerColor}>
          <TimerClock initialSeconds={initialSeconds} isRunning={isRunning} reset={reset} onTimeUpdate={handleTimeUpdate} />
        </h3>
      </div>


      {/* Time buttons */}
      <div className='flex justify-center'>
        <button onClick={shortTimeHandler} className="h-10 px-6 font-bold rounded-full bg-violet-600 text-white mr-2" type="button">
          25 Mins
        </button>
        <button onClick={longTimeHandler} className="h-10 px-6 font-bold rounded-full bg-violet-600 text-white ml-2" type="button">
          55 Mins
        </button>
      </div>

      {/* Control buttons */}
      <div className='flex flex-col items-center w-full '>
        <button
          onClick={handleToggle}
          className='py-2 px-10 mb-2 bg-purple-700 rounded-lg text-slate-100 w-11/12 md:w-1/3'
        >
          {isRunning ? 'Stop Timer' : 'Start Timer'}
        </button>
        <button
          onClick={resetHandler}
          className='py-3 px-10 mb-10 bg-purple-700 rounded-lg text-slate-100 w-11/12 md:w-1/3'
        >
          Reset Timer
        </button>
      </div>
    </div>
  </>
  );
};

export default Page;
