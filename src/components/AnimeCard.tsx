import React from 'react';
import { Link } from 'react-router-dom';
import type { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="block comics-card p-1 bg-white hover:transform hover:scale-105 transition-all duration-300 group power-up"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Score Badge */}
        {anime.score && (
          <div className="absolute top-3 right-3 comics-button px-3 py-1 bg-gradient-to-r from-comic-yellow to-orange-400">
            <span className="comics-text text-sm">⭐ {anime.score}</span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3 comics-button px-2 py-1 bg-comic-blue text-black">
          <span className="comics-text text-xs">{anime.type || 'Unknown'}</span>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3">
            <div className="comics-button px-3 py-2 bg-white text-center">
              <span className="comics-text text-sm font-bold">View Details →</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 text-gray-800 group-hover:text-comic-purple transition-colors duration-300 min-h-[3.5rem] comics-text">
          {anime.title}
        </h3>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="flex items-center comics-text">
            <span className="text-comic-red mr-1">📽️</span>
            {anime.episodes || '?'} eps
          </span>
          <span className="flex items-center comics-text">
            <span className="text-comic-red mr-1">❤️</span>
            {anime.favorites?.toLocaleString() || '0'}
          </span>
        </div>

        {anime.genres && (
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.mal_id}
                className="comics-text text-xs px-2 py-1 bg-gradient-to-r from-comic-blue/20 to-comic-purple/20 text-comic-blue border border-comic-blue/30 rounded-lg"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Lines on Hover */}
      <div className="absolute inset-0 action-lines opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </Link>
  );
};

export default AnimeCard;