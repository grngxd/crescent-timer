import { useEffect, useState, useRef } from "react";
const Timer = () => {
    const [time, setTime] = useState(0);
    const [timeParsed, setTimeParsed] = useState(time.toFixed(2));
    const [running, setRunning] = useState(false);
    const [timeout, setTimerTimeout] = useState(0.3);
    const spaceHeldDown = useRef(false);

    useEffect(() => {
        if(window.localStorage.getItem("timeout")) {
            setTimerTimeout(parseFloat(window.localStorage.getItem("timeout")!));
        } else {
            setTimerTimeout(0.3);
            window.localStorage.setItem("timeout", "0.3");
        }
    }, [])

    enum TimerState {
        STOPPED,
        HELD,
        GOOD,
        RUNNING
    }

    const [timerState, setTimerState] = useState(TimerState.STOPPED);

    useEffect(() => {
        var t = timeout * 1000;
        
        const onKeyDown = (e : any) => {
            spaceHeldDown.current = true;
            if (e.key === " ") {
                if (spaceHeldDown.current) {
                    setTimerState(TimerState.HELD);
                    
                    // wait until timout to set state to good
                    setTimeout(() => {
                        setTimerState(TimerState.GOOD);
                    }, 1000);
                }
            }
            e.preventDefault();
            return;
        }

        const onKeyUp = (e : any) => {
            spaceHeldDown.current = false;
            if (e.key === " ") {
                setTimerState(TimerState.STOPPED);
                e.preventDefault();
            }
        }

        console.log(timerState)

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }
    }, [TimerState, timeout])

    useEffect(() => {
        setTimeParsed(time.toFixed(2));
    }, [time])

    return (
        <div className="w-full flex flex-col flex-grow flex-[0.6] justify-center items-center text-9xl select-none">
            <h1 className={timerState == TimerState.HELD ? "text-red-500" : (timerState == TimerState.GOOD ? "text-green-500" : "text-white")}>{timeParsed}</h1>
        </div>
    )

}

export default Timer;