import { useEffect, useState, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const spaceRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        spaceRef.current = true;
        setIsGreen(false);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (spaceRef.current && !isActive) {
          setIsActive(true);
          timerRef.current = setInterval(() => {
            setTime((time) => time + 10);
          }, 10);
        } else if (timerRef.current !== null) {
          setIsActive(false);
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        spaceRef.current = false;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive, time]);

  useEffect(() => {
    if (isGreen) {
      timerRef.current = setTimeout(() => {
        setIsGreen(false);
      }, 300);
    } else {
      timerRef.current && clearTimeout(timerRef.current);
    }
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [isGreen]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = ((time % 60000) / 1000).toFixed(2).toString().padStart(5, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-full flex flex-col flex-grow flex-[0.7] justify-center items-center text-9xl select-none">
      <h1 className={isGreen ? "text-green-500" : isActive ? "text-red-500" : "text-black"}>
        {formatTime(time)}
      </h1>
    </div>
  );
};

export default Timer;
