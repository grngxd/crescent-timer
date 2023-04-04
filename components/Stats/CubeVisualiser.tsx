import { TwistyPlayer } from "cubing/twisty";

export default function CubeVisualiser() {
    // const twisty = new TwistyPlayer({
    //     alg: "R U R U'",
    //     background: "transparent",
        
    // })
    return (
        <div className="w-full flex flex-col flex-[0.4] justify-center">
            {`<twisty-player alg="R U R' U R U2' R'"></twisty-player>`}
        </div>
    )
}