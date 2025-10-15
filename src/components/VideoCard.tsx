import React from 'react';
import type { Video } from '../data/videos';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const embedUrl = `https://drive.google.com/file/d/${video.driveId}/preview`;

  return (
    <div className="bg-gray-50/80 backdrop-blur-sm border border-red-200/60 rounded-xl overflow-hidden hover:border-red-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 group">
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
            <p className="text-gray-600 text-sm">Video próximamente</p>
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
            <h4 className="text-gray-900 font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors">
              {video.title}
            </h4>
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
};

export default VideoCard;
