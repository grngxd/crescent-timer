export default function SidebarButton(props : any) {
    return (
           <div className="bg-x-500 hover:bg-slate-700 active:bg-slate-500 active:translate-y-1 hover:scale-105 transition-all duration-100 p-2 rounded-lg">
                {props.icon}
           </div> 
    )
}