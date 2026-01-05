import { useParams, Link } from 'react-router-dom';
import { getArticle, languages } from '../data/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, Split } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import AudioPlayer from './AudioPlayer';

export default function ArticleView() {
    const { topicId, lang } = useParams();
    const article = getArticle(topicId, lang);
    const languageInfo = languages.find(l => l.code === lang);

    if (!article) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', marginTop: '4rem' }}
            >
                <h1 style={{ fontSize: '3rem', color: '#ff4444' }}>404</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                    This article has not yet been translated into <span style={{ color: 'var(--text-main)' }}>{languageInfo?.name || lang}</span>.
                </p>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                    <ArrowLeft size={16} /> Return to Home
                </Link>
            </motion.div>
        );
    }

    return (
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                <ArrowLeft size={14} /> Back to Hub
            </Link>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="article-title"
                style={{
                    fontSize: '4.5rem',
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(to right, #fff, #888)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    width: 'fit-content'
                }}
            >
                {article.title}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="article-meta"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '2rem'
                }}
            >
                <span style={{
                    background: 'var(--accent)',
                    color: '#000',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                }}>
                    {languageInfo?.name}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                    {languageInfo?.localName}
                </span>

                <Link
                    to={`/compare/${topicId}?lang1=${lang}`}
                    style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.8rem',
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        border: '1px solid var(--accent)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                    }}
                >
                    <Split size={14} /> Rosetta View
                </Link>
            </motion.div>

            <AudioPlayer lang={languageInfo?.name || lang} />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="article-content"
                style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#ccc', marginTop: '2rem' }}
            >
                <ReactMarkdown
                    components={{
                        img: ({ node, ...props }) => (
                            <img
                                {...props}
                                style={{
                                    maxWidth: '100%',
                                    borderRadius: '12px',
                                    margin: '2rem 0',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                            />
                        ),
                        h1: ({ node, ...props }) => <h2 {...props} style={{ fontSize: '1.8rem', marginTop: '2rem' }} />,
                        h2: ({ node, ...props }) => <h3 {...props} style={{ fontSize: '1.5rem', marginTop: '1.5rem' }} />
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </motion.div>
        </article>
    );
}
