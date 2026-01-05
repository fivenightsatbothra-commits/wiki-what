import { Link, useLocation } from 'react-router-dom';
import { Home, Shuffle, Info, Heart, BookOpen, Search as SearchIcon, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

export default function Sidebar() {
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const isActive = (path) => location.pathname === path;

    // Nav Items
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: BookOpen, label: 'Topics', path: '/topics' },
        { icon: Info, label: 'About', path: '/about' },
        { icon: Plus, label: 'Create', path: '/create' },
    ];

    return (
        <>
            <nav style={{
                width: '80px',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                background: 'var(--bg-sidebar)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 0',
                borderRight: '1px solid var(--border)',
                zIndex: 100
            }}>
                <div style={{ marginBottom: '3rem', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                    W
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Search Trigger */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        title="Search (Cmd+K)"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.7rem'
                        }}
                    >
                        <SearchIcon size={24} strokeWidth={1.5} />
                    </button>

                    {/* Regular Links */}
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            title={item.label}
                            style={{
                                color: isActive(item.path) ? '#fff' : 'var(--text-muted)',
                                transition: 'all 0.3s ease',
                                transform: isActive(item.path) ? 'scale(1.1)' : 'scale(1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem',
                                fontSize: '0.7rem'
                            }}
                        >
                            <item.icon size={24} strokeWidth={1.5} />
                        </Link>
                    ))}

                    {/* Random Link */}
                    <Link
                        to="/random"
                        title="Random Article"
                        style={{
                            color: 'var(--text-muted)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.7rem'
                        }}
                    >
                        <Shuffle size={24} strokeWidth={1.5} />
                    </Link>
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <Heart size={20} color="var(--text-muted)" />
                </div>
            </nav>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
