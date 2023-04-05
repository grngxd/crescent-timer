import { ChevronDown, Plus } from "lucide-react"
import { useEffect, useState } from "react"

const Information = () => {
    var burnerSessions : any = []
    const [sessions, setSessions] = useState(["Session 1"])
    const [currentSession, setSession] = useState(0)
    
    useEffect(() => {
        if(window.localStorage.getItem("session") != null) {
            console.log("true")
            setSession(parseInt(window.localStorage.getItem("session")!))
        } else {
            window.localStorage.setItem("currentSession", "0")
            window.localStorage.setItem("sessions", JSON.stringify(["Session 1"]))
            setSessions(["Session 1"])
            setSession(0)
            console.log("false")
        }

        if (JSON.parse(window.localStorage.getItem("sessions")!) !== null || JSON.parse(window.localStorage.getItem("sessions")!) !== undefined || window.localStorage.getItem("sessions")! != "[]") {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setSessions(JSON.parse(window.localStorage.getItem("sessions")!));
            burnerSessions = sessions
        } else {
            window.localStorage.setItem("sessions", JSON.stringify(["Session 1"]));
            burnerSessions = sessions
            console.log(sessions)
        }

    }, [])

    const addSession = () => {
        const newSession = "Session " + (sessions.length + 1);
        const newSessions = [...sessions, newSession];
        window.localStorage.setItem("sessions", JSON.stringify(newSessions));
        setSessions(newSessions);
      };
      

    return (
        <div className="w-full flex flex-col flex-[0.3] justify-center items-center select- p-2">
            <div className="justify-center items-center">
                <h1 className="text-3xl text-center">2x2 Cube</h1>
                <div className="group flex flex-col gap-2 justify-center items-center !text-x-300">
                    <div className="flex gap-2 justify-center items-center pb-2 mb-2">
                        <h1 className="text-2xl">{sessions[currentSession] ? sessions[currentSession] : "Session 1"}</h1>
                        <ChevronDown size={32} className="group-hover:rotate-180 transition-all duration-500 ease-in-out" />
                    </div>
                    {/* Dropdown */}
                    <div className="hidden !select-none overflow-y-scroll absolute group-hover:flex flex-col items-center top-[6rem] mt-2 bg-white text-x-400 rounded-md py-4 w-48 max-h-32 scrollbar-none">
                        {/* <h1 className="hover:bg-x-400 hover:text-white w-full flex justify-center">Session 1</h1>
                         */}
                        {sessions.map((session, index) => {
                            return (
                                <h1 key={index} onClick={() => {setSession(index); window.localStorage.setItem("session", index.toString())}} className="hover:bg-x-400 hover:text-white w-full text-ellipsis text-center duration-200 transition-all">{session}</h1>
                            )
                        }  )}

                        <button onClick={addSession} className="hover:bg-x-400 hover:text-white w-full flex justify-center"><Plus/> Add Session</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default Information;