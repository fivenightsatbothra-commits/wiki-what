import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, languages, getAvailableLanguagesForTopic } from '../data/mockData';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Split } from 'lucide-react';

export default function RosettaView() {
    const { topicId } = useParams();
    const availableLangs = getAvailableLanguagesForTopic(topicId);
    const [lang1, setLang1] = useState(availableLangs.includes('en') ? 'en' : availableLangs[0]);
    const [lang2, setLang2] = useState(availableLangs.includes('eo') ? 'eo' : (availableLangs[1] || availableLangs[0]));

    const article1 = getArticle(topicId, lang1);
    const article2 = getArticle(topicId, lang2);

    return (
        <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Link to={`/wiki/${topicId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={16} /> Back to Single View
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                    <Split size={18} /> Rosetta Mode
                </div>
            </div>

            <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
                {/* Left Pane */}
                <div style={{ background: 'var(--bg-card)', overflowY: 'auto', padding: '2rem' }}>
                    <LanguageSelector
                        current={lang1}
                        available={availableLangs}
                        onChange={setLang1}
                    />
                    {article1 ? (
                        <ArticleContent article={article1} />
                    ) : (
                        <div style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>No article in this language.</div>
                    )}
                </div>

                {/* Right Pane */}
                <div style={{ background: 'var(--bg-card)', overflowY: 'auto', padding: '2rem' }}>
                    <LanguageSelector
                        current={lang2}
                        available={availableLangs}
                        onChange={setLang2}
                    />
                    {article2 ? (
                        <ArticleContent article={article2} />
                    ) : (
                        <div style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>No article in this language.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function LanguageSelector({ current, available, onChange }) {
    return (
        <select
            value={current}
            onChange={e => onChange(e.target.value)}
            style={{
                background: 'transparent',
                color: 'var(--text-main)',
                border: '1px solid var(--border)',
                padding: '0.5rem',
                marginBottom: '2rem',
                borderRadius: '4px',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer'
            }}
        >
            {available.map(code => {
                const lang = languages.find(l => l.code === code);
                return <option key={code} value={code}>{lang?.name}</option>
            })}
        </select>
    );
}

function ArticleContent({ article }) {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{article.title}</h1>
            <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                <ReactMarkdown
                    components={{
                        img: ({ node, ...props }) => <img {...props} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    }}
                >
                    {article.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}
