"use client";
import React, { useEffect, useState } from 'react';
import TimerClock from './Components/TimerClock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import beep from "./success.mp3";
import Stopwatch from './StopWatch/Stopwatch';
import Loader from './Components/Loader'; // Import the Loader component

const Page = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(1 * 60 * 60); // You can change this to any initial value you want
  const [currentTime, setCurrentTime] = useState(initialSeconds);
  const [showStopwatch, setShowStopwatch] = useState(false); // New state to switch between timer and stopwatch
  const [animate, setAnimate] = useState(false); // New state for animation

  const [play] = useSound(beep);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetHandler = () => {
    setIsRunning(false); // Stop the timer
    setReset((prevReset) => !prevReset); // Toggle the reset state to trigger the effect
    toast.info("Timer Reset Successful");
  };

  const shortTimeHandler = () => {
    if (isRunning && currentTime !== 0) {
      toast.warning("Timer is Already Running!!");
      toast.info("Reset for Next Session.");
    } else {
      setIsRunning(true);
      setInitialSeconds(1500);
      toast.success("25 Mins Timer Started.");
    }
  };

  const longTimeHandler = () => {
    if (isRunning && currentTime !== 0) {
      toast.warning("Timer is Already Running!!");
      toast.info("Reset for Next Session.");
    } else {
      setIsRunning(true);
      setInitialSeconds(3300);
      toast.success("55 Mins Timer Started.");
    }
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  useEffect(() => {
    if (currentTime === 0 && isRunning) {
      toast.success("🚀 Session Completed!");
      play(); // Call the play function to play the sound
    }
  }, [currentTime, isRunning, play]);

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  const handleSwitch = () => {
    setAnimate(true);
    setTimeout(() => {
      setShowStopwatch((prev) => !prev);
      setAnimate(false);
    }, 2000); // Adjust the duration to match the animation
  };

  const timerColor = currentTime
    ? "bg-purple-500 rounded-lg font-semibold text-5xl text-white text-center py-2 px-10"
    : "bg-red-500 rounded-lg font-semibold text-5xl text-white text-center py-2 px-10";

  return (
    <>
      <Loader isActive={animate} />
      <div className={`bg-purple-400 min-h-svh flex flex-col justify-between items-center ${animate ? 'fade-out' : 'fade-in'}`} onAnimationEnd={handleAnimationEnd}>
        <ToastContainer theme="dark" stacked />
        <h1 className="text-purple-700 text-4xl font-bold absolute top-12">Pomodoro</h1>

        {/* Timer or Stopwatch */}
        <div className="flex items-center justify-center pt-10">
          <h3 className={timerColor}>
            {showStopwatch ? (
              <Stopwatch initialSeconds={initialSeconds} isRunning={isRunning} reset={reset} />
            ) : (
              <TimerClock initialSeconds={initialSeconds} isRunning={isRunning} reset={reset} onTimeUpdate={handleTimeUpdate} />
            )}
          </h3>
        </div>

        {/* Pre-Defined Time buttons */}
        {!showStopwatch && (
          <div className="flex justify-center absolute bottom-[35%] select-none">
            <button
              onClick={shortTimeHandler}
              className="h-10 px-6 font-bold rounded-full bg-violet-600 text-white mr-2"
              type="button"
            >
              25 Mins
            </button>
            <button
              onClick={longTimeHandler}
              className="h-10 px-6 font-bold rounded-full bg-violet-600 text-white ml-2"
              type="button"
            >
              55 Mins
            </button>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex flex-col items-center w-full select-none">
          <button
            onClick={handleToggle}
            className="py-2 px-10 mb-2 bg-purple-700 rounded-lg text-slate-100 w-11/12 md:w-1/3"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={resetHandler}
            className="py-3 px-10 mb-10 bg-purple-700 rounded-lg text-slate-100 w-11/12 md:w-1/3"
          >
            Reset
          </button>
          <button
            onClick={handleSwitch}
            className="py-3 px-10 mb-10 bg-purple-700 rounded-lg text-slate-100 w-11/12 md:w-1/3"
          >
            {showStopwatch ? 'Show Timer' : 'Show Stopwatch'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
