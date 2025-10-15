import React from 'react';

interface TopicCardProps {
  id: number;
  name: string;
  slug: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ id, name, slug }) => {
  return (
    <a
      href={`/tema/${slug}`}
      className="group bg-gray-50/80 backdrop-blur-sm border border-red-200/60 rounded-xl p-4 md:p-6 hover:bg-white hover:border-red-300/80 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 block relative overflow-hidden w-full"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>

      <div className="relative flex items-start gap-4">
        <div className="bg-gradient-to-br from-red-500/30 to-red-600/20 p-2 md:p-3 rounded-lg border border-red-400/30 flex-shrink-0 shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
          <svg
            className="text-red-300 group-hover:text-red-200 transition-colors duration-300"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 leading-tight">
            Tema {id}: {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium border border-red-300/50">
              Ver videos
            </span>
          </div>
        </div>
        <svg
          className="text-red-400 group-hover:translate-x-1 group-hover:text-red-300 transition-all duration-300 flex-shrink-0 mt-1"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </a>
  );
};

export default TopicCard;
