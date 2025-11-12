# AnimeExplorer - Anime Search App

A modern, comic-style anime search application built with React, TypeScript, and Redux Toolkit. Discover your favorite anime with a beautiful and interactive interface.

![AnimeExplorer Screenshot](https://github.com/zhao-leihan/anime-explorerr/blob/main/view/Screenshot%20(312).png)

![part2 Screenshot](https://github.com/zhao-leihan/anime-explorerr/blob/main/view/Screenshot%20(313).png)

![part3 Screenshot](https://github.com/zhao-leihan/anime-explorerr/blob/main/view/Screenshot%20(314).png)

## Features

- **Instant Search**: Real-time anime search with debouncing
- **Comic-Style UI**: Beautiful comics-inspired design with interactive elements
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Built with React 18 and Vite for optimal performance
- **Detailed Views**: Comprehensive anime information and details
- **Smart Pagination**: Efficient server-side pagination
- **Smooth Animations**: Engaging loading animations and transitions
- **Type Safety**: Full TypeScript implementation

## Live Demo

[https://anime-explorerr.vercel.app/]

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Custom Comics Design
- **Build Tool**: Vite
- **API**: Jikan API v4 (Unofficial MyAnimeList API)

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zhao-leihan/AnimeExplorer.git
   cd AnimeExplorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:4000
   ```

## Project Structure

```
AnimeExplorer/
├── src/
│   ├── components/
│   │   ├── AnimeCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── SkeletonLoader.tsx
│   ├── pages/
│   │   ├── SearchPage.tsx
│   │   └── DetailPage.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── searchSlice.ts
│   │   └── detailSlice.ts
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── types/
│   │   └── anime.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server (port 4000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Key Features Implementation

### Search Functionality
- Debounced search with 250ms delay
- Cancel previous requests to avoid race conditions
- Real-time results with loading states

### State Management
- Redux Toolkit for centralized state management
- Search state (query, results, pagination, loading, error)
- Detail state (anime data, loading, error)

### UI/UX Design
- Custom comic-style design system
- Responsive grid layouts
- Smooth animations and transitions
- Loading skeletons for better UX

## Design System

### Color Palette
- Primary: `#ff375f`
- Secondary: `#00a8ff`
- Accent: `#ffcc00`
- Purple: `#9c51ff`
- Dark: `#1a1a2e`

### Typography
- Headings: Comic Neue (Bold)
- Body: Nunito (Regular)

## API Integration

This app uses the [Jikan API v4](https://docs.api.jikan.moe/).

##  Deployment

### Netlify / Vercel
Follow platform build instructions and set output folder to `/dist`.

##  Contributing

1. Fork repo
2. Create branch
3. Commit & push
4. Open Pull Request

##  License

MIT License

##  Author

**Rayhan**
- GitHub: [@zhao-leihan](https://https://github.com/zhao-leihan)

---

**Built using React, TypeScript, and Redux Toolkit**
