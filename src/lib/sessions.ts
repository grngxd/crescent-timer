export type Session = {
    name: string,
    cube: string,
    solves: Solve[]
}

export type Solve = {
    time: number,
    scramble: string,
    date: number
}