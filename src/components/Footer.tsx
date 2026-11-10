import React from 'react';
import { Cpu, ArrowUp, Github } from 'lucide-react';

interface FooterProps {
  onOpenGlossary: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGlossary, onOpenQuiz }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060911] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-pink-300">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-display text-base font-bold text-white tracking-tight">
                Programación de <span className="text-pink-300">Microcontroladores</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Plataforma pedagógica interactiva dedicada a la formación en ingeniería electrónica,
              sistemas embebidos y arquitectura de microcontroladores modernos.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span>Arquitecturas: 8, 16, 32 Bits</span>
              <span aria-hidden="true">·</span>
              <span>Harvard &amp; RISC</span>
            </div>
          </div>

          {/* Nav: Fundamentos */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Fundamentos
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#introduccion" className="hover:text-pink-300 transition-colors">
                  1. Introducción Histórica
                </a>
              </li>
              <li>
                <a href="#definicion" className="hover:text-purple-300 transition-colors">
                  2. Definición MCU vs MPU
                </a>
              </li>
              <li>
                <a href="#arquitectura" className="hover:text-sky-300 transition-colors">
                  3. Arquitectura Harvard
                </a>
              </li>
              <li>
                <a href="#componentes" className="hover:text-emerald-300 transition-colors">
                  4. Componentes y Periféricos
                </a>
              </li>
              <li>
                <a href="#funcionamiento" className="hover:text-pink-300 transition-colors">
                  5. Ciclo de Instrucción
                </a>
              </li>
            </ul>
          </div>

          {/* Nav: Aplicación y Práctica */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Práctica y Software
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#familias" className="hover:text-purple-300 transition-colors">
                  6. Familias (AVR, STM32, ESP32)
                </a>
              </li>
              <li>
                <a href="#lenguajes" className="hover:text-sky-300 transition-colors">
                  7. Lenguajes (C, C++, Rust, ASM)
                </a>
              </li>
              <li>
                <a href="#aplicaciones" className="hover:text-emerald-300 transition-colors">
                  8. Aplicaciones en la Industria
                </a>
              </li>
              <li>
                <a href="#ventajas-desventajas" className="hover:text-pink-300 transition-colors">
                  9. Ventajas y Desventajas
                </a>
              </li>
              <li>
                <a href="#laboratorio" className="hover:text-purple-300 transition-colors">
                  10. Laboratorio y Simulador
                </a>
              </li>
            </ul>
          </div>

          {/* Educational Resources */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Recursos Didácticos
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenGlossary}
                  className="hover:text-slate-200 transition-colors cursor-pointer text-left"
                >
                  Glosario de Silicio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-slate-200 transition-colors cursor-pointer text-left"
                >
                  Cuestionario Evaluativo
                </button>
              </li>
              <li>
                <a href="#bibliografia" className="hover:text-slate-200 transition-colors">
                  Fuentes y Datasheets
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500">
            Diseñado para estudiantes, docentes e ingenieros en mecatrónica y electrónica. Contenido verificado académicamente.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
