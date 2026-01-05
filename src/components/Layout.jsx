import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { motion } from 'framer-motion';

export default function Layout() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <ThemeSwitcher />

            {/* Background Noise/Gradient */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                background: 'radial-gradient(circle at 50% 10%, var(--bg-body) 0%, #000 100%)', // Updated to variable
                pointerEvents: 'none'
            }} />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    flexGrow: 1,
                    marginLeft: '80px', // Content pushed by sidebar
                    marginRight: '300px', // Space for language rail
                    padding: '4rem 6rem',
                    minHeight: '100vh',
                    position: 'relative'
                }}
            >
                <Outlet />
            </motion.main>

            <LanguageSwitcher />
        </div>
    );
}
