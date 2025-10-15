// src/components/introduccion/VideoDisplay.tsx
import React from 'react';
import { Play, Clock, User } from 'lucide-react';
import type { Topic } from '../../data/videos';
import { useNavigation } from '../NavigationContext';

interface VideoDisplayProps {
  videos: Topic;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videos }) => {
  const { state } = useNavigation();

  // Solo mostrar cuando la pestaña activa sea 'videos'
  if (state.activeTab !== 'videos') {
    return null;
  }

  if (!videos.videos || videos.videos.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-12 text-center shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="text-red-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            🎬 Videos Próximamente
          </h3>
          <p className="text-gray-700">
            Los videos educativos para este tema estarán disponibles pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header de Videos */}
      <div className="bg-gradient-to-br from-red-50 to-white border border-red-200/50 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-xl border border-red-300/50">
            <Play className="text-red-600" size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Videos del Tema
            </h2>
            <p className="text-gray-700 text-lg">
              {videos.name} - Videos educativos disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Videos */}
      <div className="grid md:grid-cols-2 gap-6">
        {videos.videos.map((video) => {
          const embedUrl = `https://drive.google.com/file/d/${video.driveId}/preview`;

          return (
            <div
              key={video.id}
              className="bg-gray-50/80 backdrop-blur-sm border border-red-200/60 rounded-xl overflow-hidden hover:border-red-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 group"
            >
              {/* Video Player */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {video.driveId === "PENDIENTE" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <svg
                      className="text-red-400/50 mb-4"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p className="text-gray-600 text-sm">Video pendiente</p>
                  </div>
                ) : (
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                )}
              </div>

              {/* Video Info */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-100 p-2 rounded-lg border border-red-300/50 flex-shrink-0">
                    <svg
                      className="text-red-600"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">{video.group}</p>
                  </div>
                </div>

                {video.description && (
                  <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-200 pt-3">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoDisplay;
