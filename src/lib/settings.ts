import type { Session } from "./sessions";

export const defaultSettings: Settings = {
    theme: "dark",
    locale: "en",
    notifications: true,
    timer: {
        timeout: 0.35,
        showButtons: false,
    },
    sessions: {
        current: "Default",
        sessions: {
            "Default": {
                name: "Default",
                cube: "333",
                solves: []
            },
            "2x2": {
                name: "2x2",
                cube: "222",
                solves: []
            },
        }
    }
};

export type Settings = {
    theme: string,
    locale: string,
    notifications: boolean,
    timer: {
        timeout: number,
        showButtons: boolean,
    },
    sessions: {
        current: string,
        sessions: {
            [key: string]: Session
        }
    }
}

export const getSettings = () => {
    if (typeof localStorage === 'undefined') return defaultSettings;

    let settings: Settings;
    try {
        settings = JSON.parse(localStorage.getItem('settings')!);
    } catch (e) {
        settings = defaultSettings;
        localStorage.setItem('settings', JSON.stringify(defaultSettings));
        return settings;
    }

    if (!settings) {
        settings = defaultSettings;
        localStorage.setItem('settings', JSON.stringify(defaultSettings));
        return settings;
    }

    const populated = { ...defaultSettings, ...settings };

    for (const key of Object.keys(defaultSettings)) {
        if (!populated.hasOwnProperty(key)) {
            (populated as any)[key] = defaultSettings[key as keyof Settings];
        }
    }

    if (settings !== populated) {
        settings = populated;
        localStorage.setItem('settings', JSON.stringify(populated));
    }

    return settings;
}