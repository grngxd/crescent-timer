import SidebarButton from "./SidebarButton";
import {Timer, Medal, Footprints, Wrench} from "lucide-react"

export default function Sidebar(props : any) {
    return (
        <div className="w-28 h-screen bg-x-500 flex flex-col justify-center items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
                <SidebarButton icon={<Timer className="text-white w-8 h-8"/>} />
            </a>
            <SidebarButton icon={<Medal className="text-white w-8 h-8"/>} />
            <SidebarButton icon={<Footprints className="text-white w-8 h-8"/>} />
            <a href="/settings">
                <SidebarButton icon={<Wrench className="text-white w-8 h-8"/>} />
            </a>
        </div>
    )
}