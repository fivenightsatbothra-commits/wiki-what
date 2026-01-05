import ForceGraph2D from 'react-force-graph-2d';
import { topics } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, Maximize } from 'lucide-react';

export default function KnowledgeGraph() {
    const navigate = useNavigate();
    const fgRef = useRef();
    const { currentTheme } = useTheme();
    const [dimensions, setDimensions] = useState({ w: window.innerWidth, h: window.innerHeight });
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoverNode, setHoverNode] = useState(null);

    useEffect(() => {
        function handleResize() {
            setDimensions({ w: window.innerWidth - 80, h: window.innerHeight });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Compute Data & Categories
    const { nodes, links, categories } = useMemo(() => {
        const cats = new Set(topics.map(t => t.category));
        const nodes = topics.map(t => ({ id: t.id, name: t.defaultTitle, group: t.category, val: 5 }));
        const links = [];

        topics.forEach((t1, i) => {
            topics.forEach((t2, j) => {
                if (i < j && t1.category === t2.category) {
                    links.push({ source: t1.id, target: t2.id, value: 1 });
                }
            });
        });

        return { nodes, links, categories: ['All', ...Array.from(cats)] };
    }, []);

    // Filtering Logic
    const visibleNodes = useMemo(() => {
        return nodes.filter(n => {
            const matchesCat = activeCategory === 'All' || n.group === activeCategory;
            const matchesSearch = n.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [nodes, activeCategory, searchTerm]);

    // Theme Colors
    const themeColors = {
        default: { bg: '#0a0a0a', node: '#d4a373', text: '#fff' },
        cyberpunk: { bg: '#050510', node: '#00ffea', text: '#00ffea' },
        elvish: { bg: '#f5e6d3', node: '#c5a059', text: '#2c1810' }
    }[currentTheme] || { bg: '#000', node: '#fff', text: '#fff' };

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>

            {/* HUD Control Panel */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                zIndex: 10,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                width: '300px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <Maximize size={16} color="var(--accent)" />
                    <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>Neural Graph 2.0</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-body)', padding: '0.5rem', borderRadius: '6px', marginBottom: '1rem' }}>
                    <Search size={14} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                    <input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search nodes..."
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', width: '100%', outline: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Filter size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FILTER CATEGORY</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {categories.map(c => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            style={{
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid',
                                borderColor: activeCategory === c ? 'var(--accent)' : 'var(--border)',
                                background: activeCategory === c ? 'var(--accent)' : 'transparent',
                                color: activeCategory === c ? '#000' : 'var(--text-main)',
                                cursor: 'pointer'
                            }}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {visibleNodes.length} active nodes / {nodes.length} total
                </div>
            </div>

            <ForceGraph2D
                ref={fgRef}
                width={dimensions.w}
                height={dimensions.h}
                graphData={{ nodes: visibleNodes, links }}

                // Physics
                d3VelocityDecay={0.6}
                d3AlphaDecay={0.02}

                // Colors
                backgroundColor={themeColors.bg}
                nodeColor={() => themeColors.node}

                // Particles
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={d => d.value * 0.005}
                linkDirectionalParticleWidth={2}

                // Interactions
                onNodeClick={node => navigate(`/wiki/${node.id}`)}
                onNodeHover={node => setHoverNode(node || null)}

                // Custom Rendering
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const isHover = hoverNode === node;
                    const label = node.name;
                    const fontSize = (isHover ? 16 : 12) / globalScale;

                    // Glow effect
                    if (isHover) {
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = themeColors.node;
                    } else {
                        ctx.shadowBlur = 0;
                    }

                    ctx.font = `${isHover ? 'bold' : ''} ${fontSize}px Sans-Serif`;

                    // Background pill
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.5);
                    ctx.fillStyle = isHover ? themeColors.node : 'rgba(0, 0, 0, 0.4)';
                    if (isHover) ctx.fillStyle = themeColors.node; // Full solid on hover

                    ctx.beginPath();
                    ctx.roundRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions,
                        4
                    );
                    ctx.fill();

                    // Text
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = isHover ? '#000' : themeColors.text;
                    ctx.fillText(label, node.x, node.y);

                    // Reset shadow
                    ctx.shadowBlur = 0;
                }}
            />
        </div>
    );
}
