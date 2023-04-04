import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

export default function Settings() {
  const [sessions, setSessions] = useState(["Session 1"]);
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

  const changeSessionName = (index: number, value: string) => {
    const updatedSessions = [...sessions];
    updatedSessions[index] = value;
    setSessions(updatedSessions);
    window.localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  const deleteSession = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    if (updatedSessions.length === 0) {
      updatedSessions.push("Session 1");
    }
    setSessions(updatedSessions);
    window.localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  const addSession = () => {
    const newSession = "Session " + (sessions.length + 1);
    const newSessions = [...sessions, newSession];
    window.localStorage.setItem("sessions", JSON.stringify(newSessions));
    setSessions(newSessions);
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
              {sessions.map((session, index) => {
                return (
                  <div key={index} className="flex items-left justify-normal gap-2">
                    <input
                      type="text"
                      defaultValue={session}
                      className="bg-white text-x-500 rounded-lg p-1 h-full"
                      onChange={(e) => {
                        changeSessionName(index, e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        deleteSession(index);
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
                ><Plus/> Add Session</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
