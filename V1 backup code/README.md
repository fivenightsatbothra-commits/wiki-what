# ConWiki

A next-generation encyclopedia platform for constructed languages ("Conlangs"). Designed with a premium, award-winning aesthetic.

## Features

-   **Multi-Lang Support**: Seamless switching between languages for the same topic.
-   **Premium UI**: Dark mode, glassmorphism, and smooth Framer Motion animations.
-   **Content**: Articles available in English, Esperanto, Toki Pona, Klingon, Sindarin, and High Valyrian.
-   **Responsive**: Mobile-ready layout with floating navigation.

## Setup Locally

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Dev Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:5173`.

## Deployment (GitHub Pages)

To host this on GitHub Pages:

1.  update `vite.config.js` to set the base path:
    ```js
    // vite.config.js
    export default defineConfig({
      base: '/your-repo-name/', 
      plugins: [react()],
    })
    ```

2.  Run the build:
    ```bash
    npm run build
    ```

3.  Deploy the `dist` folder. You can use **gh-pages** package:
    ```bash
    npm install gh-pages --save-dev
    ```
    Add to `package.json`:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
    Then run:
    ```bash
    npm run deploy
    ```
