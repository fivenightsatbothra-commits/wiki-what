import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

export default function AudioPlayer({ lang }) {
    const [playing, setPlaying] = useState(false);

    // Mock toggle
    const toggle = () => setPlaying(!playing);

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.5rem 1rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            marginBottom: '1rem',
            marginTop: '1rem'
        }}>
            <button
                onClick={toggle}
                style={{
                    background: 'var(--accent)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {playing ? 'Playing pronunciation...' : `Listen in ${lang}`}
            </div>
            {/* Visualizer Mock */}
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '15px' }}>
                {[...Array(10)].map((_, i) => (
                    <div key={i} style={{
                        width: '3px',
                        height: playing ? `${Math.random() * 15 + 5}px` : '3px',
                        background: 'var(--text-muted)',
                        transition: 'height 0.1s ease'
                    }} />
                ))}
            </div>
        </div>
    );
}
