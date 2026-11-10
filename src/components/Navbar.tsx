import React, { useState, useEffect } from 'react';
import { Cpu, BookOpen, Layers, Terminal, Sparkles, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenGlossary: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGlossary, onOpenQuiz }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#090D16]/95 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/30'
          : 'bg-[#090D16] border-slate-800/50'
      }`}
    >
      {/* Zone 1, 2, 3 separated by gap-8 - Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-lg py-1 px-1.5"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-sky-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 group-hover:border-pink-400/60 transition-colors">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-display">
            Micro<span className="text-pink-300">Lab</span>{' '}
            <span className="text-xs font-normal text-purple-300">EDU</span>
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-slate-300">
          <a
            href="#introduccion"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 py-1"
          >
            Fundamentos
          </a>
          <a
            href="#arquitectura"
            className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 py-1"
          >
            Arquitectura
          </a>
          <a
            href="#componentes"
            className="hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 py-1"
          >
            Componentes
          </a>
          <a
            href="#familias"
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 py-1"
          >
            Familias
          </a>
          <a
            href="#laboratorio"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-400 py-1"
          >
            Laboratorio
          </a>
          <button
            onClick={onOpenGlossary}
            className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 py-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            <span>Glosario</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:border-purple-400/50 transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-300" />
            <span>Autoevaluación</span>
          </button>
          <a
            href="#laboratorio"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-gradient-to-r from-pink-300 via-purple-300 to-sky-200 hover:from-pink-200 hover:to-sky-100 rounded-lg shadow-sm shadow-pink-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Simulador en Vivo</span>
          </a>
        </div>
      </div>
    </header>
  );
};
