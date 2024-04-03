import { checkFields } from '$lib/util';
import { getSettings } from './settings';
export const defaultThemes: { [key: string]: Theme } = {
    dark: {
        background: '#121212',
        colors: {
            universal: {
                primary: '#bb86fc',
                secondary: '#03dac6',
                tertiary: '#3700b3',
            },
            levels: {
                success: '#388e3c',
                danger: '#d32f2f',
                warning: '#fbc02d',
            },
            text: {
                primary: '#ffffff',
                secondary: '#a0a0a0',
                tertiary: '#616161',
            },
            timer: {
                idle: '#ffffff',
                //waiting: '#fbc02d',
                waiting: '#d32f2f',
                ready: '#388e3c',
                timing: '#ffffff',
            }
        }
    },
    light: {
        background: '#ffffff',
        colors: {
            universal: {
                primary: '#6200ee',
                secondary: '#03dac6',
                tertiary: '#3700b3',
            },
            levels: {
                success: '#388e3c',
                danger: '#d32f2f',
                warning: '#fbc02d',
            },
            text: {
                primary: '#000000',
                secondary: '#616161',
                tertiary: '#a0a0a0',
            },
            timer: {
                idle: '#000000',
                //waiting: '#fbc02d',
                waiting: '#d32f2f',
                ready: '#388e3c',
                timing: '#000000',
            }
        }
    
    }
}

export type Theme = {
    background: string,
    colors: {
        universal: {
            primary: string,
            secondary: string,
            tertiary: string,
        },
        levels: {
            success: string,
            danger: string,
            warning: string,
        },
        text: {
            primary: string,
            secondary: string,
            tertiary: string,
        },
        timer: {
            idle: string,
            waiting: string,
            ready: string,
            timing: string,
        }
    }
}

export const getTheme = () => {
    if (typeof localStorage === 'undefined') return defaultThemes.light;

    let theme: Theme;
    try {
        theme = (JSON.parse(localStorage.getItem('themes')!) as { [key: string]: Theme })[getSettings().theme];
    } catch (e) {
        theme = defaultThemes.dark;
        localStorage.setItem('themes', JSON.stringify(defaultThemes));
        return theme;
    }
    if (!theme || !checkFields(theme, defaultThemes.dark)) {
        theme = defaultThemes.dark;
        localStorage.setItem('themes', JSON.stringify(defaultThemes));
        return theme;
    }

    const populated = { ...defaultThemes[getSettings().theme], ...theme };
    if (theme !== populated) {
        theme = populated;
        localStorage.setItem('theme', JSON.stringify(populated));
    }

    return theme;
}