
export const defaultTheme = {
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
};

function checkFields(obj1: any, obj2: any): boolean {
    for (let key in obj1) {
        if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            if (!checkFields(obj1[key], obj2[key])) return false;
        } else if (obj2[key] === undefined) {
            return false;
        }
    }
    return true;
}

export const getTheme = () => {
    if (typeof localStorage === 'undefined') return defaultTheme;

    let theme: typeof defaultTheme;
    try {
        theme = JSON.parse(localStorage.getItem('theme')!);
    } catch (e) {
        theme = defaultTheme;
        localStorage.setItem('theme', JSON.stringify(defaultTheme));
        return theme;
    }
    if (!theme || !checkFields(defaultTheme, theme)) {
        theme = defaultTheme;
        localStorage.setItem('theme', JSON.stringify(defaultTheme));
        return theme;
    }

    const populated = { ...defaultTheme, ...theme };
    if (theme !== populated) {
        theme = populated;
        localStorage.setItem('theme', JSON.stringify(populated));
    }

    return theme;
}