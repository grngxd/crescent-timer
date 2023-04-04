import CubeVisualiser from "./CubeVisualiser";


export default function Stats() {
    var time = 0;
    var timeParsed = time.toFixed(2);
    return (
        <div className="w-full flex flex-col flex-[0.4] justify-center">
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://cdn.cubing.net/js/cubing/twisty" type="module"></script> 
            <CubeVisualiser />
        </div>
    )
}