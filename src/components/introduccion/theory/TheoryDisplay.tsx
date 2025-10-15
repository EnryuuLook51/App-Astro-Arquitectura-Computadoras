import { BookOpen, Code, Image, Lightbulb } from 'lucide-react';
import React, { useState } from 'react';
import type { TheoryContent } from '../../../data/theory';
import { useNavigation } from '../../NavigationContext';

// Import del modal - VERIFICA QUE ESTE ARCHIVO EXISTA
import ImageModal from './ImageModal';

interface TheoryDisplayProps {
  theory: TheoryContent;
}

const TheoryDisplay: React.FC<TheoryDisplayProps> = ({ theory }) => {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const { state } = useNavigation();

  if (state.activeTab !== 'theory') {
    return null;
  }

  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  return (
    <>
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-red-50 to-white border border-red-200/50 rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-xl border border-red-300/50">
              <BookOpen className="text-red-600" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {theory.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {theory.description}
              </p>
            </div>
          </div>
        </div>

        {theory.sections.map((section, index) => (
          <div
            key={section.id}
            className="bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white font-bold rounded-full text-lg">
                {index + 1}
              </span>
              <h3 className="text-2xl font-bold text-gray-900">
                {section.title}
              </h3>
            </div>

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>

            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="bg-red-50/50 border border-red-200/50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="text-red-600" size={20} />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Puntos Clave
                  </h4>
                </div>
                <ul className="space-y-2">
                  {section.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.examples && section.examples.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="text-gray-600" size={20} />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Ejemplos
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.examples.map((example, i) => (
                    <li key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                      <code className="text-sm text-gray-800 font-mono">
                        {example}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {section.diagrams && section.diagrams.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-300/50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg border border-blue-300/50">
                    <Image className="text-blue-600" size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Diagramas Ilustrativos
                  </h4>
                </div>
                <div className={`grid gap-6 ${section.diagrams.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
                  {section.diagrams.map((diagram, i) => (
                    <div
                      key={i}
                      className="group bg-white rounded-xl overflow-hidden border border-blue-200/70 hover:border-blue-400/70 transition-all duration-300 hover:shadow-lg cursor-pointer"
                      onClick={() => handleImageClick(diagram, `${section.title} - Figura ${i + 1}`)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={diagram}
                          alt={`Diagrama ${i + 1} - ${section.title}`}
                          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%236b7280" font-family="system-ui" font-size="16">Imagen no disponible</text></svg>';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-blue-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Image size={16} />
                            Click para ampliar
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-xs text-gray-600 text-center">
                          Figura {i + 1} - Click para ver en detalle
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {theory.references && theory.references.length > 0 && (
          <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              📚 Referencias
            </h4>
            <ul className="space-y-2">
              {theory.references.map((ref, i) => (
                <li key={i} className="text-gray-700 text-sm pl-4 border-l-2 border-red-300">
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={() => setModalImage(null)}
        />
      )}
    </>
  );
};

export default TheoryDisplay;
