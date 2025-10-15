import { useEffect, useState } from 'react';
import LogoUNS from './LogoUNS';

interface BlurHeaderProps {
  title: string;
}

export default function BlurHeader({ title }: BlurHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / documentHeight, 1);

      setIsScrolled(scrollY > 50);
      setScrollProgress(progress);

      if (scrollY > 100) {
        setIsVisible(true);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: false
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Indicador de progreso con efecto glass */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-full scroll-progress transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Header flotante estilo Midudev */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out`}
      >
        {/* Fondo con efecto de vidrio avanzado - backdrop-blur difumina lo que está DETRÁS */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          isScrolled
            ? 'opacity-97 bg-white/70 backdrop-blur-xl border-b border-red-200/60 shadow-2xl shadow-red-500/10'
            : 'opacity-0 bg-transparent backdrop-blur-none border-b-0 shadow-none'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/60 to-white/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-3 md:py-4 max-w-7xl relative">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'min-h-[60px]' : 'min-h-[80px]'
          }`}>
            <a
              href="/"
              className={`flex items-center gap-3 transition-all duration-500 hover:scale-105 group relative header-element`}
            >
              {/* Efecto de brillo detrás del logo */}
              <div className={`absolute -inset-2 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-2xl blur-lg transition-all duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}></div>

              <div className={`relative transition-all duration-500 ${
                isScrolled ? 'scale-100' : 'scale-110'
              }`}>
                <LogoUNS />
              </div>

              <div className={`hidden sm:block transition-all duration-500 ${
                isScrolled
                  ? 'opacity-100 translate-x-0 blur-0'
                  : 'opacity-0 translate-x-2 blur-sm'
              }`}>
                <div className="relative">
                  <h1 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                    Arquitectura de
                    <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      Computadoras
                    </span>
                  </h1>
                  <p className="text-xs md:text-sm text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                    Universidad Nacional del Santa
                  </p>
                </div>
              </div>

              <div className={`sm:hidden transition-all duration-500 ${
                isScrolled
                  ? 'opacity-100 translate-x-0 blur-0'
                  : 'opacity-0 translate-x-2 blur-sm'
              }`}>
                <h1 className="text-base md:text-lg font-bold text-gray-900">
                  Arquitectura
                </h1>
              </div>
            </a>

            {/* Información adicional con efectos y blur */}
            <div className={`hidden md:flex items-center gap-4 transition-all duration-700 ${
              isScrolled
                ? 'opacity-100 translate-x-0 blur-0'
                : 'opacity-0 translate-x-4 blur-md'
            }`}>
              <div className="text-right relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-100/50 to-red-200/50 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative px-3 py-2 bg-white/80 rounded-lg border border-red-200/50">
                  <p className="text-sm font-medium text-gray-900">Ciclo IV - 2025</p>
                  <p className="text-xs text-gray-600">Dr. Guerra Cordero</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos adicionales */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200/50 to-transparent"></div>
        )}
      </header>
    </>
  );
}
