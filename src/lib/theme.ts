import { deepEquality } from './util';

export const defaultTheme = {
    background: '#f5f5f5',
    colors: {
        universal: {
            primary: '#007bff',
            secondary: '#6c757d',
            tertiary: '#17a2b8',
        },
        levels: {
            success: '#28a745',
            danger: '#dc3545',
            warning: '#ffc107',
        },
        text: {
            primary: '#212529',
            secondary: '#495057',
            tertiary: '#6c757d',
        },
        timer: {
            idle: '#000000',
            waiting: '#ffc107',
            ready: '#28a745',
            timing: '#000000',
        }
    }
};

export const getTheme = () => {
    if (typeof localStorage === 'undefined') return defaultTheme;

    let theme: typeof defaultTheme = JSON.parse(localStorage.getItem('theme')!);
    if (!theme) {
        theme = defaultTheme;
        localStorage.setItem('theme', JSON.stringify(defaultTheme));
        return theme;
    }

    if (!deepEquality(theme, defaultTheme)) {
        theme = defaultTheme;
        localStorage.setItem('theme', JSON.stringify(defaultTheme));
        return theme;
    }   

    const populated = { ...defaultTheme, ...theme };
    if (theme !== populated) {
        theme = populated;
        localStorage.setItem('theme', JSON.stringify(populated));
        return theme;
    }

    return theme;
}