import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
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

export default function Settings() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setSession] = useState(0);

  useEffect(() => {
    if (window.localStorage.getItem("session") !== null) {
      setSession(parseInt(window.localStorage.getItem("session")!));
    } else {
      window.localStorage.setItem("currentSession", "0");
      setSession(0);
    }

    const storedSessions = JSON.parse(window.localStorage.getItem("sessions")!);
    if (storedSessions && storedSessions.length > 0) {
      setSessions(storedSessions);
    } else {
      window.localStorage.setItem("sessions", JSON.stringify(["Session 1"]));
    }
  }, []);

  const changeSessionName = (id: number, value: string) => {
    const updatedSessions = [...sessions];
    const index = updatedSessions.findIndex((session) => session.id === id);
    updatedSessions[index].name = value;
    setSessions(updatedSessions);
    window.localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };
  

  const deleteSession = (uid: string) => {
    const updatedSessions = sessions.filter((session) => session.uid !== uid);
    setSessions(updatedSessions);
    window.localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };
  
  

  const addSession = () => {
    const newSession = {
      name: "Session " + (sessions.length + 1),
      id: sessions.length,
      uid: short.generate(),
      data: { solves: {} },
    };
    const newSessions = [...sessions, newSession];
    window.localStorage.setItem("sessions", JSON.stringify(newSessions));
    setSessions(newSessions);
    setSession(newSession.id);
  };
  
  

  return (
    <div className="flex w-screen h-screen bg-x-400 gap-2">
      <div className="hidden md:block">
        <Sidebar buttonActive={4} />
      </div>
      <div className="flex flex-col p-6">
        <h1 className="text-3xl">Settings</h1>
        <div className="pt-2 px-6 flex flex-col items-left justify-center ">
          <div className="flex flex-shrink flex-col gap-2">
            <h1 className="text-xl">Sessions</h1>
            <div className="flex flex-col gap-2">
            {sessions.map((session) => {
              return (
                <div key={session.uid} className="flex items-left justify-normal gap-2">
                  <input
                    type="text"
                    defaultValue={session.name}
                    className="bg-white text-x-500 rounded-lg p-1 h-full"
                    onChange={(e) => {
                      changeSessionName(session.id, e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      deleteSession(session.uid);
                    }}
                    className="bg-white text-x-500 rounded-lg p-1 h-full"
                  >
                    <X />
                  </button>
                </div>
              );
            })}

              <button
                onClick={() => {
                  addSession();
                }}
                className="bg-white text-x-500 rounded-lg p-1 h-full inline-flex flex-shrink-0 w-auto"
              >
                <Plus /> Add Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
