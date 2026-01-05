# 🌐 SHREY Wiki (ConWiki)

> **A Next-Generation Encyclopedia for Constructed Languages.**
> *Winner of the "Imaginary Awwwards" for Best Encyclopedia Design.*

![Wiki Preview](https://placehold.co/1200x600/0a0a0a/ffffff?text=SHREY+Wiki+Preview)

## ✨ Overview

**SHREY Wiki** is a modern, interactive knowledge base designed specifically for storing and exploring articles in constructed languages (Conlangs) like **Esperanto**, **Toki Pona**, **Elvish**, and **Klingon**. 

Unlike traditional wikis, SHREY Wiki prioritizes **visual immersion**, **linguistic comparison**, and **data interactivity**. It features a premium "Glassmorphism" aesthetic, a neural knowledge graph, and a split-screen "Rosetta Mode" for language learners.

## 🚀 Key Features

### 🎨 Visuals & Immersion
-   **Theme Engine**: Toggle between **Cyberpunk** (Neon/Glitch), **Elvish** (Parchment/Serif), and **Default Dark** modes.
-   **Cinematic Typography**: Uses *Playfair Display* and *Inter* for a reading experience that feels like a high-end magazine.
-   **Fluid Animations**: Powered by `framer-motion` for seamless page transitions and entrance effects.

### 🧠 Knowledge Graph 2.0
-   **Interactive Web**: Visualize the connection between topics in a 3D neural network.
-   **Live HUD**: Filter nodes by category (e.g., "History", "Sci-Fi") and search instantly.
-   **Particle Effects**: "Living" links that pulse to show active connections.

### 📚 Linguistic Tools
-   **Rosetta Mode**: Split-screen view to compare an article in two languages side-by-side (e.g., English vs. Esperanto).
-   **Audio Pronunciation**: Integrated player to hear how the conlang sounds.
-   **Language Switcher**: seamless global state management for instant language toggling.

### ✍️ Creator Studio
-   **Markdown Editor**: Write articles with rich text and image support.
-   **Topic Management**: Create new topics and export them as structured `.js` files.
-   **Instant Preview**: See how your article looks before exporting.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite
-   **Styling**: Vanilla CSS Variables (Theming), Framer Motion
-   **Data**: File-based dynamic system (`.js` modules)
-   **Visualization**: `react-force-graph-2d`
-   **Icons**: `lucide-react`
-   **Routing**: `react-router-dom`

## 📦 Installation

Prerequisites: Node.js (v16+)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/wiki-what.git
    cd wiki-what
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:5173`.

## 🚢 Deployment (GitHub Pages)

This project is configured for easy deployment.

1.  **Update `vite.config.js`**
    Ensure the `base` property matches your repository name:
    ```js
    export default defineConfig({
      base: '/wiki-what/', // Replace with your repo name
      plugins: [react()],
    })
    ```

2.  **Build & Deploy**
    ```bash
    npm run build
    npm run deploy
    ```
    *(Note: Ensure you have `gh-pages` installed or configure a GitHub Action).*

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Created with ❤️ by the SHREY Team.*
