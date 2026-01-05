import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import ArticleView from './components/ArticleView';
import Home from './components/Home';
import About from './components/About';
import RandomRedirect from './components/RandomRedirect';
import CreatorStudio from './components/CreatorStudio';
import RosettaView from './components/RosettaView';
import KnowledgeGraph from './components/KnowledgeGraph';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/wiki-what">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="create" element={<CreatorStudio />} />
            <Route path="graph" element={<KnowledgeGraph />} />
            <Route path="topics" element={<Home />} />
            <Route path="random" element={<RandomRedirect />} />
            <Route path="wiki/:topicId" element={<NavigateToDefaultLang />} />
            <Route path="wiki/:topicId/:lang" element={<ArticleView />} />
            <Route path="compare/:topicId" element={<RosettaView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Helper to redirect to default language (English or first available)
import { getAvailableLanguagesForTopic } from './data/mockData';
import { useParams, Navigate as RouterNavigate } from 'react-router-dom';

function NavigateToDefaultLang() {
  const { topicId } = useParams();
  const langs = getAvailableLanguagesForTopic(topicId);
  const defaultLang = langs.includes('en') ? 'en' : langs[0];

  if (!defaultLang) return <div>Topic not found</div>;

  return <RouterNavigate to={`/wiki/${topicId}/${defaultLang}`} replace />;
}

export default App;
