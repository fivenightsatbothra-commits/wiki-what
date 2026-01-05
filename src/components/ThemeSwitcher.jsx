import { useTheme, themes } from '../context/ThemeContext';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ThemeSwitcher() {
    const { currentTheme, setCurrentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 200 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-main)',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title="Change Theme"
            >
                <Palette size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: 0,
                            marginBottom: '1rem',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            padding: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            minWidth: '140px'
                        }}
                    >
                        {Object.keys(themes).map(themeKey => (
                            <button
                                key={themeKey}
                                onClick={() => {
                                    setCurrentTheme(themeKey);
                                    setIsOpen(false);
                                }}
                                style={{
                                    background: currentTheme === themeKey ? 'var(--accent)' : 'transparent',
                                    color: currentTheme === themeKey ? '#000' : 'var(--text-main)',
                                    border: 'none',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontSize: '0.9rem',
                                    fontWeight: currentTheme === themeKey ? 'bold' : 'normal'
                                }}
                            >
                                {themes[themeKey].name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
