<script lang="ts">
  import { onMount } from "svelte";

    const moves = {
            "3x3": {
                Up: {
                    name: "Up",
                    notation: "U",
                    inverse: "U'",
                    double: "U2",
                    wide: "Uw"
                },
                Down: {
                    name: "Down",
                    notation: "D",
                    inverse: "D'",
                    double: "D2",
                    wide: "Dw"
                },
                Left: {
                    name: "Left",
                    notation: "L",
                    inverse: "L'",
                    double: "L2",
                    wide: "Lw"
                },
                Right: {
                    name: "Right",
                    notation: "R",
                    inverse: "R'",
                    double: "R2",
                    wide: "Rw"
                },
                Front: {
                    name: "Front",
                    notation: "F",
                    inverse: "F'",
                    double: "F2",
                    wide: "Fw"
                },
                Back: {
                    name: "Back",
                    notation: "B",
                    inverse: "B'",
                    double: "B2",
                    wide: "Bw"
                },
            },
            "2x2": {
                Up: {
                    name: "Up",
                    notation: "U",
                    inverse: "U'",
                    double: "U2",
                    wide: "Uw"
                },
                Down: {
                    name: "Down",
                    notation: "D",
                    inverse: "D'",
                    double: "D2",
                    wide: "Dw"
                },
                Left: {
                    name: "Left",
                    notation: "L",
                    inverse: "L'",
                    double: "L2",
                    wide: "Lw"
                },
                Right: {
                    name: "Right",
                    notation: "R",
                    inverse: "R'",
                    double: "R2",
                    wide: "Rw"
                },
                Front: {
                    name: "Front",
                    notation: "F",
                    inverse: "F'",
                    double: "F2",
                    wide: "Fw"
                },
                Back: {
                    name: "Back",
                    notation: "B",
                    inverse: "B'",
                    double: "B2",
                    wide: "Bw"
                },
            },
            "4x4": {
                Up: { name: "Up", notation: "U", inverse: "U'", double: "U2", wide: "Uw" },
                Down: { name: "Down", notation: "D", inverse: "D'", double: "D2", wide: "Dw" },
                Left: { name: "Left", notation: "L", inverse: "L'", double: "L2", wide: "Lw" },
                Right: { name: "Right", notation: "R", inverse: "R'", double: "R2", wide: "Rw" },
                Front: { name: "Front", notation: "F", inverse: "F'", double: "F2", wide: "Fw" },
                Back: { name: "Back", notation: "B", inverse: "B'", double: "B2", wide: "Bw" },
            },
            "5x5": {
                Up: { name: "Up", notation: "U", inverse: "U'", double: "U2", wide: "Uw" },
                Down: { name: "Down", notation: "D", inverse: "D'", double: "D2", wide: "Dw" },
                Left: { name: "Left", notation: "L", inverse: "L'", double: "L2", wide: "Lw" },
                Right: { name: "Right", notation: "R", inverse: "R'", double: "R2", wide: "Rw" },
                Front: { name: "Front", notation: "F", inverse: "F'", double: "F2", wide: "Fw" },
                Back: { name: "Back", notation: "B", inverse: "B'", double: "B2", wide: "Bw" },
            },
            pyraminx: {
                Up: { name: "Up", notation: "U", inverse: "U'", double: "U2" },
                Down: { name: "Down", notation: "D", inverse: "D'", double: "D2" },
                Left: { name: "Left", notation: "L", inverse: "L'", double: "L2" },
                Right: { name: "Right", notation: "R", inverse: "R'", double: "R2" },
                Front: { name: "Front", notation: "F", inverse: "F'", double: "F2" },
                Back: { name: "Back", notation: "B", inverse: "B'", double: "B2" },
            },
            skewb: {
                Up: { name: "Up", notation: "U", inverse: "U'", double: "U2" },
                Down: { name: "Down", notation: "D", inverse: "D'", double: "D2" },
                Left: { name: "Left", notation: "L", inverse: "L'", double: "L2" },
                Right: { name: "Right", notation: "R", inverse: "R'", double: "R2" },
                Front: { name: "Front", notation: "F", inverse: "F'", double: "F2" },
                Back: { name: "Back", notation: "B", inverse: "B'", double: "B2" },
            },
            "square-1": {
                Up: { name: "Up", notation: "U", inverse: "U'", double: "U2" },
                Down: { name: "Down", notation: "D", inverse: "D'", double: "D2" },
                Left: { name: "Left", notation: "L", inverse: "L'", double: "L2" },
                Right: { name: "Right", notation: "R", inverse: "R'", double: "R2" },
                Front: { name: "Front", notation: "F", inverse: "F'", double: "F2" },
                Back: { name: "Back", notation: "B", inverse: "B'", double: "B2" },
            },
            "megaminx": {
                Up: { name: "Up", notation: "U", inverse: "U'", double: "U2" },
                Down: { name: "Down", notation: "D", inverse: "D'", double: "D2" },
                Left: { name: "Left", notation: "L", inverse: "L'", double: "L2" },
                Right: { name: "Right", notation: "R", inverse: "R'", double: "R2" },
                Front: { name: "Front", notation: "F", inverse: "F'", double: "F2" },
                Back: { name: "Back", notation: "B", inverse: "B'", double: "B2" },
            },
        }

    const cubes = [
        "3x3",
        "2x2",
        "4x4",
        "5x5",
        "pyraminx",
        "skewb",
        "square-1",
    ]

    const scrambles = {
        "3x3": 18,
        "2x2": 9,
        "4x4": 40,
        "5x5": 60,
        pyraminx: 11,
        skewb: 11,
        "square-1": 11,
    }

    const generateScramble = (cube: string) => {
        const mv = moves[cube as keyof typeof moves];
        const scramble = [];
        let lastMove = null;
        for (let i = 0; i < scrambles[cube as keyof typeof scrambles]; i++) {
            let move;
            do {
                move = Object.values(mv)[Math.floor(Math.random() * Object.keys(mv).length)];
            } while (move === lastMove);
            lastMove = move;
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                scramble.push(move.notation);
            } else if (type === 1 && move.double) {
                scramble.push(move.double);
            } else if (type === 2 && move.inverse) {
                scramble.push(move.inverse);
            }
        }
        return scramble;
    }

    onMount(() => {
        console.log(generateScramble("3x3"));
    })
</script>

{generateScramble("3x3").join(" ")}