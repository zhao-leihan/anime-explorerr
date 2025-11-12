import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const comicImages = [
    'https://images.seeklogo.com/logo-png/61/2/one-piece-skull-logo-png_seeklogo-613212.png',
    'https://www.pngall.com/wp-content/uploads/15/Naruto-Shippuden-Logo-Transparent.png',
    'https://images.seeklogo.com/logo-png/40/2/demon-slayer-logo-png_seeklogo-408228.png',
  ];

  useEffect(() => {
    if (!isLoading) {
      // Simulate progress completion
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setVisible(false), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
      setVisible(true);
    }
  }, [isLoading]);


  useEffect(() => {
    if (!visible) return;

    const imgInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % comicImages.length);
    }, 800);

    return () => clearInterval(imgInterval);
  }, [visible, comicImages.length]);

  if (!visible) return null;

  const comicPhrases = [
    "Preparing for adventure...",
    "Collecting power-ups...",
    "Loading epic moments...",
    "Setting up characters...",
    "Almost there, kid!",
    "Prepare for battle!"
  ];

  const randomPhrase = comicPhrases[Math.floor(Math.random() * comicPhrases.length)];

  return (
    <div className="loading-screen">
      {/* Animated Comic Elements */}
      <div className="absolute top-10 left-10 comic-bounce">🎮</div>
      <div className="absolute top-10 right-10 float-comic" style={{ animationDelay: '0.5s' }}>🌟</div>
      <div className="absolute bottom-10 left-10 float-comic" style={{ animationDelay: '1s' }}>⚡</div>
      <div className="absolute bottom-10 right-10 comic-bounce" style={{ animationDelay: '1.5s' }}>🎯</div>

      {/* Rotating Image Logo (3 PNGs) */}
      <div className="relative w-32 h-32 mb-6 mx-auto">
        {comicImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Loading logo ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 rounded-lg ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-center mb-8">
        <h2 className="comics-text text-3xl mb-4 text-gray-800">
          Anime<span className="anime-text">Search</span>
        </h2>
        <p className="text-lg text-gray-600 comics-text">{randomPhrase}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 bg-white border-3 border-gray-800 rounded-full overflow-hidden comics-border">
        <div
          className="h-4 bg-gradient-to-r from-comic-red to-comic-purple transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Dots */}
      <div className="flex space-x-2 mt-4 justify-center">
        <div className="w-3 h-3 bg-comic-red rounded-full comic-bounce"></div>
        <div className="w-3 h-3 bg-comic-blue rounded-full comic-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-comic-yellow rounded-full comic-bounce" style={{ animationDelay: '0.4s' }}></div>
        <div className="w-3 h-3 bg-comic-purple rounded-full comic-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>

      {/* Credit */}
      <div className="absolute bottom-6 comics-text text-gray-500">
        Crafted by <span className="font-bold text-comic-red">Rayhan</span>
      </div>
    </div>
  );
};

export default LoadingScreen;