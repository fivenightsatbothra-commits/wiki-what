import { motion } from 'framer-motion';

export default function About() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>About ConWiki</h1>

                <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8, marginBottom: '2rem' }}>
                    ConWiki is a dedicated encyclopedia for preserving and expanding knowledge through the medium of
                    <strong> Constructed Languages (Conlangs)</strong>.
                </p>

                <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8, marginBottom: '2rem' }}>
                    We believe that language is the ultimate art form. By translating concepts like History, Cinema, and Technology into languages like
                    <em> Esperanto</em>, <em> Toki Pona</em>, and <em> Sindarin</em>, we test the limits of these constructed systems.
                </p>

                <h2 style={{ fontSize: '2rem', marginTop: '4rem', marginBottom: '1rem' }}>The Mission</h2>
                <ul style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    <li>Provide a platform for polyglots and conlangers.</li>
                    <li>Archive knowledge in languages that don't have a home on standard Wikipedia.</li>
                    <li>Created with ❤️ by the SHREY team.</li>
                </ul>
            </motion.div>
        </div>
    );
}
