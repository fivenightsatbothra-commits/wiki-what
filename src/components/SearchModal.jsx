import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { topics } from '../data/mockData';

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        setQuery('');
        setResults([]);
    }, [isOpen]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const filtered = topics.filter(t =>
            t.defaultTitle.toLowerCase().includes(lowerQuery) ||
            t.category?.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
        setSelectedIndex(0);
    }, [query]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            if (results[selectedIndex]) {
                goToTopic(results[selectedIndex].id);
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const goToTopic = (id) => {
        navigate(`/wiki/${id}`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 200,
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: '20vh',
                            left: '50%',
                            x: '-50%',
                            width: '90%',
                            maxWidth: '600px',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            zIndex: 201,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1rem',
                            borderBottom: '1px solid #333'
                        }}>
                            <Search size={20} color="#666" style={{ marginRight: '1rem' }} />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search topics..."
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    width: '100%',
                                    outline: 'none',
                                    fontFamily: 'var(--font-sans)'
                                }}
                            />
                            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0.5rem' }}>
                            {results.length === 0 && query && (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                    No results found.
                                </div>
                            )}
                            {results.length === 0 && !query && (
                                <div style={{ padding: '1rem', color: '#444', fontSize: '0.9rem' }}>
                                    Type to search...
                                </div>
                            )}

                            {results.map((topic, index) => (
                                <div
                                    key={topic.id}
                                    onClick={() => goToTopic(topic.id)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        background: index === selectedIndex ? 'var(--accent)' : 'transparent',
                                        color: index === selectedIndex ? '#000' : '#fff',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span style={{ fontWeight: '500' }}>{topic.defaultTitle}</span>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{topic.category}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            padding: '0.5rem 1rem',
                            borderTop: '1px solid #333',
                            background: '#111',
                            fontSize: '0.8rem',
                            color: '#666',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>Select <kbd style={{ background: '#333', padding: '0 4px', borderRadius: '3px' }}>↵</kbd></span>
                            <span>Navigate <kbd style={{ background: '#333', padding: '0 4px', borderRadius: '3px' }}>↓</kbd> <kbd style={{ background: '#333', padding: '0 4px', borderRadius: '3px' }}>↑</kbd></span>
                            <span>Close <kbd style={{ background: '#333', padding: '0 4px', borderRadius: '3px' }}>Esc</kbd></span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
