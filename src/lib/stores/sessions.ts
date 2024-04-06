import { writable } from "svelte/store"

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

export type Sessions = {
    sessions: {
        [key: string]: Session
    }
}

export const defaultSessions: Sessions = {
    sessions: {
        default: {
            name: 'Default',
            cube: '333',
            solves: []
        },
        '2x2': {
            name: '2x2',
            cube: '222',
            solves: []
        },
    }
}

export const sessions = writable<Sessions>(defaultSessions);
export const currentSession = writable<string>('default');

export const getSessions = () => {
    if (typeof localStorage === 'undefined') return defaultSessions;

    let sessions: Sessions;
    try {
        sessions = JSON.parse(localStorage.getItem('sessions')!);
    } catch (e) {
        sessions = defaultSessions;
        localStorage.setItem('sessions', JSON.stringify(defaultSessions));
        return sessions;
    }

    if (!sessions) {
        sessions = defaultSessions;
        localStorage.setItem('sessions', JSON.stringify(defaultSessions));
        return sessions;
    }

    const populated = { ...defaultSessions, ...sessions };

    for (const key of Object.keys(defaultSessions)) {
        if (!populated.hasOwnProperty(key)) {
            (populated as any)[key] = defaultSessions[key as keyof Sessions];
        }
    }

    return populated;
}