import { Link } from 'react-router-dom';
import { topics } from '../data/mockData';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '1rem' }}>
                    ConWiki<span style={{ color: 'var(--accent)' }}>.</span>
                </h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '4rem' }}>
                    Explore human knowledge through the lens of constructed tongues. From Elvish to Esperanto.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {topics.map((topic, i) => (
                    <motion.div
                        key={topic.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                    >
                        <Link to={`/wiki/${topic.id}`} style={{ display: 'block', height: '100%' }}>
                            <div className="topic-card" style={{
                                padding: '2rem',
                                border: '1px solid var(--border)',
                                background: 'var(--bg-card)',
                                height: '100%',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{
                                    textTransform: 'uppercase',
                                    fontSize: '0.75rem',
                                    letterSpacing: '1px',
                                    color: 'var(--accent)',
                                    marginBottom: '1rem'
                                }}>
                                    {topic.category || 'Article'}
                                </div>
                                <h3 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{topic.defaultTitle}</h3>
                                <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
                                    <ArrowUpRight color="var(--text-muted)" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
