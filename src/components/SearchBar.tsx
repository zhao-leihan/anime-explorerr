import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../store/searchSlice';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    dispatch(setQuery(newValue));
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className="w-6 h-6 text-comic-purple" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Your Anime.."
          value={value}
          onChange={handleChange}
          className="w-full pl-12 pr-6 py-4 text-lg bg-white border-3 border-comic-dark rounded-2xl shadow-comic focus:outline-none focus:ring-4 focus:ring-comic-purple/30 focus:border-comic-purple transition-all duration-300 placeholder-gray-500 comics-text"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-comic-purple rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Search Tips */}
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm comics-text">
          Enter for show the results!!
        </p>
      </div>
    </div>
  );
};

export default SearchBar;