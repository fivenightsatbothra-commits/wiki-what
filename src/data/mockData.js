// Static languages definition
export const languages = [
    { code: 'en', name: 'English', localName: 'English' },
    { code: 'eo', name: 'Esperanto', localName: 'Esperanto' },
    { code: 'tok', name: 'Toki Pona', localName: 'toki pona' },
    { code: 'sindarin', name: 'Sindarin', localName: 'Edhellen' },
    { code: 'tlh', name: 'Klingon', localName: 'tlhIngan Hol' },
    { code: 'valyrian', name: 'High Valyrian', localName: 'Valyrio' },
];

// Dynamic imports using Vite's import.meta.glob
const modules = import.meta.glob('./articles/*.js', { eager: true });

// Normalize the data into our app's structure
const loadedTopics = [];
const loadedArticles = [];

for (const path in modules) {
    const mod = modules[path].default;
    if (mod) {
        loadedTopics.push({
            id: mod.id,
            defaultTitle: mod.defaultTitle,
            category: mod.category
        });

        if (mod.articles && Array.isArray(mod.articles)) {
            mod.articles.forEach(art => {
                loadedArticles.push({
                    topicId: mod.id,
                    lang: art.lang,
                    title: art.title,
                    content: art.content
                });
            });
        }
    }
}

export const topics = loadedTopics;
export const articles = loadedArticles;

export const getArticle = (topicId, lang) => {
    return articles.find(a => a.topicId === topicId && a.lang === lang);
};

export const getAvailableLanguagesForTopic = (topicId) => {
    return articles
        .filter(a => a.topicId === topicId)
        .map(a => a.lang);
};
