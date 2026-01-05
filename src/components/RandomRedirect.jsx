import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { topics } from '../data/mockData';

export default function RandomRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        // Redirect to default wiki page (which then redirects to best language)
        navigate(`/wiki/${randomTopic.id}`, { replace: true });
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'var(--text-muted)'
        }}>
            Shuffling...
        </div>
    );
}
