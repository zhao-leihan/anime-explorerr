import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchAnimeDetail, clearDetail } from '../store/detailSlice';
import { SkeletonDetail } from '../components/SkeletonLoader';
import LoadingScreen from '../components/LoadingScreen';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { anime, loading, error } = useSelector((state: RootState) => state.detail);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(id));
    }

    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (!loading && anime) {
      setTimeout(() => setContentVisible(true), 300);
      setTimeout(() => setInitialLoad(false), 1000);
    }
  }, [loading, anime]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (initialLoad) {
    return <LoadingScreen isLoading={initialLoad} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white comic-dots py-8">
        <div className="container mx-auto px-4">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white comic-dots py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="comics-card p-8 bg-red-50 border-red-300 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mr-4 shake-comic comics-border">
                  <span className="text-white text-2xl">⚠️</span>
                </div>
                <span className="comics-text text-2xl text-red-800">Battle Error!</span>
              </div>
              <p className="text-red-700 mb-6 text-lg">{error}</p>
              <button
                onClick={handleBackClick}
                className="comics-button px-6 py-3 bg-comic-red text-white hover:bg-red-600 comics-text text-lg"
              >
                ← Back to Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-white comic-dots py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="comics-card p-12 bg-white">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-comic-red to-comic-purple rounded-full flex items-center justify-center comics-border">
                <span className="text-4xl">😢</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4 comics-text">Anime Not Found!</h3>
              <button
                onClick={handleBackClick}
                className="comics-button px-6 py-3 bg-comic-blue text-white hover:bg-blue-600 comics-text text-lg"
              >
                ← Back to Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white comic-dots py-8">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl float-comic opacity-20">🎨</div>
        <div className="absolute top-10 right-10 text-4xl comic-bounce opacity-20" style={{ animationDelay: '0.3s' }}>✨</div>
        <div className="absolute bottom-10 left-10 text-3xl float-comic opacity-20" style={{ animationDelay: '0.6s' }}>⚡</div>
        <div className="absolute bottom-10 right-10 text-3xl comic-bounce opacity-20" style={{ animationDelay: '0.9s' }}>🎯</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="group inline-flex items-center comics-button px-6 py-3 bg-white hover:bg-gray-50 comics-text text-lg"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </button>
        </div>

        {/* Main Content */}
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Image Section - More Compact */}
            <div className="lg:w-2/5">
              <div className="sticky top-8">
                <div
                  className={`comics-card p-2 bg-white transition-all duration-1000 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    onLoad={handleImageLoad}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="comics-card p-4 bg-white text-center">
                    <div className="text-2xl font-bold text-comic-purple comics-text">{anime.score || 'N/A'}</div>
                    <div className="text-gray-600 text-sm comics-text">Score</div>
                  </div>
                  <div className="comics-card p-4 bg-white text-center">
                    <div className="text-2xl font-bold text-comic-blue comics-text">{anime.rank || 'N/A'}</div>
                    <div className="text-gray-600 text-sm comics-text">Rank</div>
                  </div>
                  <div className="comics-card p-4 bg-white text-center">
                    <div className="text-2xl font-bold text-comic-red comics-text">{anime.popularity || 'N/A'}</div>
                    <div className="text-gray-600 text-sm comics-text">Popularity</div>
                  </div>
                </div>

                {/* Additional Quick Info */}
                <div className="comics-card p-6 bg-white mt-6">
                  <h3 className="comics-text text-lg font-bold mb-4 text-gray-800 flex items-center">
                    <span className="w-3 h-3 bg-comic-yellow rounded-full mr-3"></span>
                    Quick Info
                  </h3>
                  <div className="space-y-3">
                    <InfoItem label="Episodes" value={anime.episodes?.toString() || 'Unknown'} />
                    <InfoItem label="Status" value={anime.status || 'Unknown'} />
                    <InfoItem label="Aired" value={anime.aired?.string || 'Unknown'} />
                    <InfoItem label="Duration" value={anime.duration || 'Unknown'} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5">
              <div className="comics-card p-8 bg-white">
                {/* Title Section */}
                <div className="mb-8 text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 comics-text leading-tight">
                    {anime.title}
                  </h1>

                  {anime.title_english && anime.title_english !== anime.title && (
                    <h2 className="text-2xl text-comic-blue mb-4 comics-text font-semibold">
                      {anime.title_english}
                    </h2>
                  )}

                  {anime.title_japanese && (
                    <div className="text-lg text-gray-600 comics-text mb-6 italic">{anime.title_japanese}</div>
                  )}

                  {/* Rating Badge */}
                  <div className="inline-flex comics-button px-4 py-2 bg-comic-yellow comics-text">
                    Rating: {anime.rating || 'Unknown'}
                  </div>
                </div>

                {/* Synopsis */}
                {anime.synopsis && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 comics-text flex items-center">
                      <span className="w-3 h-8 bg-comic-red rounded-full mr-3"></span>
                      Synopsis
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg comics-text">{anime.synopsis}</p>
                  </div>
                )}

                {/* Genres */}
                {anime.genres && anime.genres.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 comics-text flex items-center">
                      <span className="w-3 h-8 bg-comic-purple rounded-full mr-3"></span>
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {anime.genres.map((genre, index) => (
                        <span
                          key={genre.mal_id}
                          className="comics-button px-4 py-2 bg-gradient-to-r from-comic-purple to-comic-blue text-gray-800 font-bold comics-text hover:scale-105 transition-transform duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <DetailInfoItem label="Type" value={anime.type || 'Unknown'} />
                    <DetailInfoItem label="Season" value={anime.season || 'Unknown'} />
                    <DetailInfoItem label="Year" value={anime.year?.toString() || 'Unknown'} />
                    <DetailInfoItem label="Rating" value={anime.rating || 'Unknown'} />
                  </div>
                  <div className="space-y-4">
                    <DetailInfoItem label="Source" value={anime.source || 'Unknown'} />
                    <DetailInfoItem label="Members" value={anime.members?.toLocaleString() || '0'} />
                    <DetailInfoItem label="Favorites" value={anime.favorites?.toLocaleString() || '0'} />
                    <DetailInfoItem label="Popularity" value={anime.popularity?.toString() || 'N/A'} />
                  </div>
                </div>

                {/* Studios & Producers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {anime.studios && anime.studios.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 comics-text flex items-center">
                        <span className="w-3 h-8 bg-comic-blue rounded-full mr-3"></span>
                        Studios
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {anime.studios.map((studio, index) => (
                          <span
                            key={studio.mal_id}
                            className="comics-button px-4 py-2 bg-comic-blue text-gray-800 font-bold comics-text"
                            style={{ animationDelay: `${index * 150}ms` }}
                          >
                            {studio.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {anime.producers && anime.producers.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4 comics-text flex items-center">
                        <span className="w-3 h-8 bg-comic-green rounded-full mr-3"></span>
                        Producers
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {anime.producers.slice(0, 3).map((producer, index) => (
                          <span
                            key={producer.mal_id}
                            className="comics-button px-4 py-2 bg-green-500 text-gray-800 font-bold comics-text"
                            style={{ animationDelay: `${index * 150}ms` }}
                          >
                            {producer.name}
                          </span>
                        ))}
                        {anime.producers.length > 3 && (
                          <span className="comics-button px-4 py-2 bg-gray-500 text-gray-800 font-bold comics-text">
                            +{anime.producers.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Background */}
                {anime.background && (
                  <div className="mt-8 pt-8 border-t-2 border-gray-300">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 comics-text flex items-center">
                      <span className="w-3 h-8 bg-comic-yellow rounded-full mr-3"></span>
                      Background
                    </h3>
                    <p className="text-gray-700 leading-relaxed comics-text">{anime.background}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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

// Helper Components
const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="comics-text text-gray-600 font-semibold">{label}</span>
    <span className="comics-text text-gray-800 font-bold">{value}</span>
  </div>
);

const DetailInfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="comics-card p-4 bg-gray-50 hover:bg-white transition-colors duration-300">
    <div className="comics-text text-gray-600 text-sm mb-1">{label}</div>
    <div className="comics-text text-gray-800 font-bold text-lg">{value}</div>
  </div>
);

export default DetailPage;