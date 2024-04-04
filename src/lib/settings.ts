export const defaultSettings = {
    theme: "dark",
    locale: "en",
    notifications: true,
    timer: {
        timeout: 0.35,
        showButtons: false,
    }
};

export type Settings = {
    theme: string,
    locale: string,
    notifications: boolean,
    timer: {
        timeout: number,
        showButtons: boolean,
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