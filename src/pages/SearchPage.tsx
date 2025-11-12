import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { searchAnime } from '../store/searchSlice';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import { SkeletonCard } from '../components/SkeletonLoader';
import LoadingScreen from '../components/LoadingScreen';

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, loading, error, pagination } = useSelector(
    (state: RootState) => state.search
  );

  const [localQuery, setLocalQuery] = useState(query);
  const [initialLoad, setInitialLoad] = useState(true);
  const debouncedQuery = useDebounce(localQuery, 250);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchAnime({ query: debouncedQuery, page: 1 }));
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => setInitialLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page: number) => {
    if (debouncedQuery.trim()) {
      dispatch(searchAnime({ query: debouncedQuery, page }));
    }
  };

  if (initialLoad) {
    return <LoadingScreen isLoading={initialLoad} />;
  }

  return (
    <div className="min-h-screen bg-white comic-dots">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 text-4xl float-comic">🎨</div>
        <div className="absolute top-4 right-4 text-4xl comic-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
        <div className="absolute bottom-4 left-10 text-3xl float-comic" style={{ animationDelay: '0.6s' }}>⚡</div>
        <div className="absolute bottom-4 right-10 text-3xl comic-bounce" style={{ animationDelay: '0.9s' }}>🎯</div>

        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-6xl font-bold mb-4 comics-text">
            Anime<span className="anime-text">Search</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto comics-text">
            Discover your favorite anime universe! Super-fast search with a fun comic style!
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 mb-12">
        <SearchBar value={localQuery} onChange={setLocalQuery} />

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="comics-card p-6 bg-red-50 border-red-300">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 shake-comic">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <span className="comics-text text-xl text-red-800">Oops! Error Battle!</span>
              </div>
              <p className="text-red-700 text-center">{error}</p>
            </div>
          </div>
        )}

        {/* Results Info */}
        {!loading && !error && debouncedQuery.trim() && results.length > 0 && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center comics-button px-6 py-3 bg-white">
              <span className="text-2xl mr-3"></span>
              <span className="comics-text">
                Found <strong>{pagination.total.toLocaleString()}</strong> results for
                <strong className="text-comic-red"> "{debouncedQuery}"</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16">
        {!loading && !error && debouncedQuery.trim() && results.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="comics-card p-12 bg-white">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-comic-red to-comic-purple rounded-full flex items-center justify-center comics-border">
                <span className="text-6xl">😢</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 comics-text">No Anime Found!</h3>
              <p className="text-gray-600 mb-6 text-lg">
                No results for <strong>"{debouncedQuery}"</strong>. Try a different keyword!
              </p>
              <div className="comics-text text-gray-500 text-sm">
                💡 Tip: Try "Naruto", "One Piece", or "Demon Slayer"
              </div>
            </div>
          </div>
        )}

        {!loading && !error && !debouncedQuery.trim() && (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="comics-card p-12 bg-white">
              <div className="w-40 h-40 mx-auto mb-8 float-comic">
                <div className="w-full h-full bg-gradient-to-r from-comic-blue to-comic-purple rounded-full flex items-center justify-center comics-border">
                  <span className="text-7xl">🔍</span>
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-6 comics-text">Welcome to AnimeSearch!</h3>
              <p className="text-gray-700 text-xl mb-8 comics-text">
                Start your anime adventure! Type your favorite anime title in the search bar above. 
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {['Naruto', 'One Piece', 'Demon Slayer'].map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => setLocalQuery(suggestion)}
                    className="comics-button py-4 px-6 bg-white hover:bg-gray-50 transition-colors comics-text text-lg"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {[...Array(10)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Results Grid */}
            {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {results.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {results.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            lastVisiblePage={pagination.lastVisiblePage}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}

        {/* Footer Credit */}
        <div className="text-center mt-16 pt-8 border-t-2 border-gray-300">
          <div className="comics-text text-gray-600 text-lg">
            Made by <span className="text-comic-red font-bold">Rayhan</span>
          </div>
          <div className="text-gray-400 text-sm mt-2 comics-text">
            • Powered by Jikan API • 
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;