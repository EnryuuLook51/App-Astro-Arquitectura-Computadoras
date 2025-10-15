import { ChevronRight } from 'lucide-react';
import React from 'react';

interface UnitCardProps {
  id: number;
  title: string;
  description: string;
  topics: number;
  slug: string;
}

const UnitCard: React.FC<UnitCardProps> = ({ id, title, description, topics, slug }) => {
  return (
    <a
      href={`/${slug}`}
      className="group bg-gray-50/80 backdrop-blur-sm border border-red-200/60 rounded-xl p-4 md:p-6 hover:bg-white hover:border-red-300/80 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-red-200/50 block relative overflow-hidden w-full"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-red-500/30 to-red-600/20 p-2 rounded-lg border border-red-400/30 shadow-lg group-hover:shadow-red-500/30 transition-all duration-300 flex-shrink-0">
              <span className="text-red-300 font-bold text-sm">U{id}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
              {title}
            </h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-sm md:text-base">
            {description}
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-300/50">
              {topics} temas disponibles
            </span>
          </div>
        </div>
        <ChevronRight
          className="text-red-400 group-hover:translate-x-2 group-hover:text-red-300 transition-all duration-300 flex-shrink-0 self-center sm:self-auto"
          size={28}
        />
      </div>
    </a>
  );
};

export default UnitCard;
