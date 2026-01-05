import { Link, useParams } from 'react-router-dom';
import { getAvailableLanguagesForTopic, languages } from '../data/mockData';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
    const { topicId, lang: currentLang } = useParams();

    if (!topicId) return null;

    const availableLangCodes = getAvailableLanguagesForTopic(topicId);
    const availableLanguages = languages.filter(l => availableLangCodes.includes(l.code));
    const missingLanguages = languages.filter(l => !availableLangCodes.includes(l.code));

    return (
        <motion.aside
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
                width: '300px',
                height: '100vh',
                position: 'fixed',
                right: 0,
                top: 0,
                borderLeft: '1px solid var(--border)',
                padding: '2rem',
                background: 'rgba(17, 17, 17, 0.5)',
                backdropFilter: 'blur(10px)',
                zIndex: 90
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--accent)' }}>
                <Globe size={18} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic' }}>Translations</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {availableLanguages.map(lang => (
                    <Link
                        key={lang.code}
                        to={`/wiki/${topicId}/${lang.code}`}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '4px',
                            background: lang.code === currentLang ? 'var(--accent)' : 'transparent',
                            color: lang.code === currentLang ? '#000' : 'var(--text-main)',
                            fontSize: '0.9rem',
                            border: '1px solid',
                            borderColor: lang.code === currentLang ? 'var(--accent)' : 'var(--border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <span>{lang.name}</span>
                        <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>{lang.localName}</span>
                    </Link>
                ))}
            </div>

            {missingLanguages.length > 0 && (
                <div style={{ marginTop: '3rem', opacity: 0.4 }}>
                    <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Missing Translations</h4>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem' }}>
                        {missingLanguages.map(lang => (
                            <li key={lang.code} style={{ marginBottom: '0.5rem', cursor: 'pointer', borderBottom: '1px dashed #444', paddingBottom: '2px' }} title="Translate this!">
                                {lang.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.aside>
    );
}
