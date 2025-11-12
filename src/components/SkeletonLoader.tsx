import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="comics-card p-1 bg-white animate-pulse">
      <div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl skeleton"></div>
      <div className="p-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3 skeleton comics-text"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 skeleton comics-text"></div>
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 skeleton"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 skeleton"></div>
        </div>
        <div className="flex gap-1">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 skeleton"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonDetail: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button Skeleton */}
      <div className="mb-8">
        <div className="w-48 h-12 bg-gray-200 rounded-lg skeleton comics-border"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section Skeleton */}
        <div className="lg:w-2/5">
          <div className="sticky top-8">
            <div className="comics-card p-2 bg-white">
              <div className="w-full h-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl skeleton"></div>
            </div>
            
            {/* Quick Stats Skeleton */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="comics-card p-4 bg-white">
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 skeleton"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded skeleton"></div>
                </div>
              ))}
            </div>

            {/* Quick Info Skeleton */}
            <div className="comics-card p-6 bg-white mt-6">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-4 skeleton"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 skeleton"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 skeleton"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section Skeleton */}
        <div className="lg:w-3/5">
          <div className="comics-card p-8 bg-white">
            {/* Title Section */}
            <div className="mb-8 text-center lg:text-left">
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 skeleton"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mx-auto lg:mx-0 skeleton mb-4"></div>
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 skeleton"></div>
            </div>

            {/* Synopsis Skeleton */}
            <div className="mb-8">
              <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-4 skeleton"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded skeleton"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded skeleton"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 skeleton"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6 skeleton"></div>
              </div>
            </div>

            {/* Genres Skeleton */}
            <div className="mb-8">
              <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-4 skeleton"></div>
              <div className="flex flex-wrap gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg skeleton"></div>
                ))}
              </div>
            </div>

            {/* Info Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="comics-card p-4 bg-gray-50">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2 skeleton"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 skeleton"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="comics-card p-4 bg-gray-50">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2 skeleton"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 skeleton"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studios Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-4 skeleton"></div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="w-24 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg skeleton"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-4 skeleton"></div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg skeleton"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};