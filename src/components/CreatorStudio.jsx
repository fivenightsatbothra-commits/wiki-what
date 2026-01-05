import { useState } from 'react';
import { languages } from '../data/mockData';
import { motion } from 'framer-motion';
import { Download, Plus, Trash } from 'lucide-react';

export default function CreatorStudio() {
    const [topicId, setTopicId] = useState('');
    const [defaultTitle, setDefaultTitle] = useState('');
    const [category, setCategory] = useState('');
    const [articles, setArticles] = useState([{ lang: 'en', title: '', content: '' }]);

    const handleAddLang = () => {
        setArticles([...articles, { lang: 'en', title: '', content: '' }]);
    };

    const handleRemoveLang = (index) => {
        setArticles(articles.filter((_, i) => i !== index));
    };

    const updateArticle = (index, field, value) => {
        const newArticles = [...articles];
        newArticles[index][field] = value;
        setArticles(newArticles);
    };

    const handleExport = () => {
        const fileContent = `export default {
  id: '${topicId || 'unknown'}',
  defaultTitle: '${defaultTitle.replace(/'/g, "\\'")}',
  category: '${category || 'Uncategorized'}',
  articles: ${JSON.stringify(articles, null, 2)}
};`;

        const blob = new Blob([fileContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${topicId || 'article'}.js`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', color: '#eee' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Creator Studio</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Create a new topic, add articles in multiple languages, and export the file.
                Drop the exported file into <code>src/data/articles/</code> to publish correctly.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Topic ID (e.g., 'chess')</label>
                    <input
                        value={topicId}
                        onChange={e => setTopicId(e.target.value)}
                        style={inputStyle}
                        placeholder="my-topic-id"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Default Title</label>
                    <input
                        value={defaultTitle}
                        onChange={e => setDefaultTitle(e.target.value)}
                        style={inputStyle}
                        placeholder="My Awesome Topic"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Category</label>
                    <input
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={inputStyle}
                        placeholder="Technology"
                    />
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>Articles</h2>

            {articles.map((art, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #333' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Translation #{idx + 1}</h3>
                        {articles.length > 1 && (
                            <button onClick={() => handleRemoveLang(idx)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                                <Trash size={18} />
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Language</label>
                            <select
                                value={art.lang}
                                onChange={e => updateArticle(idx, 'lang', e.target.value)}
                                style={{ ...inputStyle, cursor: 'pointer' }}
                            >
                                {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Article Title</label>
                            <input
                                value={art.title}
                                onChange={e => updateArticle(idx, 'title', e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Content (Markdown Supported)</label>
                        <textarea
                            value={art.content}
                            onChange={e => updateArticle(idx, 'content', e.target.value)}
                            style={{ ...inputStyle, minHeight: '200px', resize: 'vertical', fontFamily: 'monospace' }}
                            placeholder="# Hello World!&#10;&#10;![Image](url)"
                        />
                    </div>
                </motion.div>
            ))}

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
                <button onClick={handleAddLang} style={buttonSecondaryStyle}>
                    <Plus size={18} /> Add Language
                </button>
                <button onClick={handleExport} style={buttonPrimaryStyle}>
                    <Download size={18} /> Export Article
                </button>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#111',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem'
};

const buttonPrimaryStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'var(--accent)',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem'
};

const buttonSecondaryStyle = {
    ...buttonPrimaryStyle,
    background: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border)'
};
