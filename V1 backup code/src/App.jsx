import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import ArticleView from './components/ArticleView';
import Home from './components/Home';
import About from './components/About';
import RandomRedirect from './components/RandomRedirect';
import CreatorStudio from './components/CreatorStudio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="create" element={<CreatorStudio />} />
          <Route path="topics" element={<Home />} /> {/* Reusing Home grid for topics for now */}
          <Route path="random" element={<RandomRedirect />} />
          <Route path="wiki/:topicId" element={<NavigateToDefaultLang />} />
          <Route path="wiki/:topicId/:lang" element={<ArticleView />} />
        </Route>
      </Routes>
    </BrowserRouter>
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
