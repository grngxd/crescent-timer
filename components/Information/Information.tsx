import { ChevronDown, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import short from "short-uuid";

type Session = {
  name: string;
  id: number;
  uid: string;
  data: {
    solves: {
      [key: string]: {
        time: number;
        PlusTwo: boolean;
        DNF: boolean;
      };
    };
  };
};

const Information = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState(0);
  
  useEffect(() => {
    const storedSessions = JSON.parse(window.localStorage.getItem("sessions") || "[]") as Session[];
    
    if (storedSessions.length === 0) {
      const newSession = {
        name: "Session 1",
        id: 0,
        uid: short.generate(),
        data: { solves: {} },
      };
      window.localStorage.setItem("sessions", JSON.stringify([newSession]));
      setSessions([newSession]);
    } else {
      setSessions(storedSessions);
    }

    const storedSessionIndex = parseInt(window.localStorage.getItem("currentSession") || "0");
    setCurrentSession(storedSessionIndex);
  }, []);

  const addSession = () => {
    const newSession: Session = {
      name: "Session " + (sessions.length + 1),
      id: sessions.length,
      uid: short.generate(),
      data: { solves: {} },
    };
    const newSessions = [...sessions, newSession];
    window.localStorage.setItem("sessions", JSON.stringify(newSessions));
    setSessions(newSessions);
    setCurrentSession(newSession.id);
  };
  
  const handleSessionChange = (index: number) => {
    setCurrentSession(index);
    window.localStorage.setItem("currentSession", index.toString());
  }

  return (
    <div className="w-full flex flex-col flex-[0.3] justify-center items-center select- p-2">
      <div className="justify-center items-center">
        <h1 className="text-3xl text-center">2x2 Cube</h1>
        <div className="group flex flex-col gap-2 justify-center items-center !text-x-300">
          <div className="flex gap-2 justify-center items-center pb-2 mb-2">
            <h1 className="text-2xl">{sessions[currentSession]?.name ?? "Session 1"}</h1>
            <ChevronDown size={32} className="group-hover:rotate-180 transition-all duration-500 ease-in-out" />
          </div>
          {/* Dropdown */}
          <div className="hidden !select-none overflow-y-scroll absolute group-hover:flex flex-col items-center top-[6rem] mt-2 bg-white text-x-400 rounded-md py-4 w-48 max-h-32 scrollbar-none">
            {sessions.map((session, index) => (
              <h1
                key={index}
                onClick={() => handleSessionChange(index)}
                className={`hover:bg-x-400 hover:text-white w-full text-ellipsis text-center duration-200 transition-all ${
                  currentSession === index ? "bg-x-400 text-white" : ""
                }`}
              >
                {session.name}
              </h1>
            ))}
            <button onClick={addSession} className="hover:bg-x-400 hover:text-white w-full flex justify-center">
              <Plus/> Add Session
            </button>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default Information;
