// src/components/introduccion/HybridTopicPage.tsx
import React from 'react';
import type { CompleteTopicData } from '../../data/topics';
import { NavigationProvider } from '../NavigationContext';
import TabNavigation from './TabNavigation';
import TheoryDisplay from './theory/TheoryDisplay';
import VideoDisplay from './VideoDisplay';

interface HybridTopicPageProps {
  topicData: CompleteTopicData;
  unitName: string;
  topicName: string;
}

const HybridTopicPage: React.FC<HybridTopicPageProps> = ({
  topicData,
  unitName,
  topicName
}) => {
  if (!topicData.theory && !topicData.videos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚧 Tema en Desarrollo
            </h2>
            <p className="text-gray-700">
              Este tema estará disponible próximamente con contenido teórico y videos educativos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Back Button */}
          <a
            href="/unidad-1"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 transition-all duration-300 hover:scale-105 group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-red-200/50 hover:border-red-300/70"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              className="group-hover:-translate-x-1 transition-transform duration-300"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            <span className="font-medium">Volver a Unidad 1</span>
          </a>

          {/* Topic Header */}
          <div className="bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-red-500/30 to-red-600/20 p-4 rounded-xl border border-red-400/30">
                <svg
                  className="text-red-600"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-400 text-sm font-semibold bg-red-500/10 px-3 py-1 rounded-full border border-red-400/30">
                    {unitName}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {topicName}
                </h2>
                <p className="text-gray-700">
                  Contenido educativo completo: teoría y videos prácticos
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <TabNavigation />

          {/* Content Display */}
          <div className="space-y-8">
            {topicData.theory && (
              <TheoryDisplay theory={topicData.theory} />
            )}

            {topicData.videos && (
              <VideoDisplay videos={topicData.videos} />
            )}
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
};

export default HybridTopicPage;
