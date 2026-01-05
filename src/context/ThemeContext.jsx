import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    default: {
        name: 'Default Dark',
        variables: {
            '--bg-body': '#0a0a0a',
            '--bg-sidebar': '#111111',
            '--bg-card': '#1c1c1c',
            '--text-main': '#e0e0e0',
            '--text-muted': '#888888',
            '--accent': '#d4a373',
            '--font-serif': "'Playfair Display', serif",
            '--font-sans': "'Inter', sans-serif"
        }
    },
    cyberpunk: {
        name: 'Neon City',
        variables: {
            '--bg-body': '#050510',
            '--bg-sidebar': '#090915',
            '--bg-card': '#121225',
            '--text-main': '#00ffea',
            '--text-muted': '#ff00ff',
            '--accent': '#fcee0a',
            '--font-serif': "'Courier New', monospace",
            '--font-sans': "'Courier New', monospace"
        }
    },
    elvish: {
        name: 'Ancient Scroll',
        variables: {
            '--bg-body': '#f5e6d3',
            '--bg-sidebar': '#e6d5c0',
            '--bg-card': '#fdf6e3',
            '--text-main': '#2c1810',
            '--text-muted': '#8b5a2b',
            '--accent': '#c5a059',
            '--font-serif': "'Cinzel', serif",
            '--font-sans': "'Lato', sans-serif"
        }
    }
};

export function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState('default');

    useEffect(() => {
        const theme = themes[currentTheme];
        Object.entries(theme.variables).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
