export const defaultSettings = {
    theme: "dark",
    locale: "en",
    notifications: true,
    timer: {
        timeout: 0.35,
    }
};

type Settings = {
    theme: string,
    locale: string,
    notifications: boolean,
    timer: {
        timeout: number,
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
    if (settings !== populated) {
        settings = populated;
        localStorage.setItem('settings', JSON.stringify(populated));
    }

    return settings;
}