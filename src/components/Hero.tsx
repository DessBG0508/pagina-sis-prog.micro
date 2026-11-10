import React from 'react';
import { ArrowRight, Cpu, Code2, Zap, BookOpen } from 'lucide-react';

interface HeroProps {
  onOpenGlossary: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGlossary, onOpenQuiz }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800/60 bg-gradient-to-b from-[#0B101E] via-[#090D16] to-[#090D16]">
      {/* Background ambient pastel accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Metadata kicker */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium tracking-wide">
              <span className="text-pink-300">Ingeniería Electrónica</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-purple-300">Sistemas Embebidos</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-sky-300">Guía Universitaria</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-[1.15] mb-5">
              Programación de{' '}
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300 bg-clip-text text-transparent">
                Microcontroladores
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Descubre los fundamentos teóricos y prácticos que dan vida al silicio:
              desde la arquitectura interna y la manipulación de registros hasta la
              programación de periféricos en tiempo real y el manejo de interrupciones.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#laboratorio"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-pink-300 via-purple-300 to-sky-200 hover:from-pink-200 hover:to-sky-100 rounded-xl shadow-lg shadow-pink-500/10 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                <span>Probar Simulador</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#arquitectura"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:border-purple-400/50 hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <Cpu className="w-4 h-4 text-purple-300" />
                <span>Explorar Arquitectura</span>
              </a>

              <button
                onClick={onOpenGlossary}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 bg-transparent hover:text-white transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Glosario Técnico</span>
              </button>
            </div>

            {/* Adjacency Proof: Key concepts badges as clean text */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">10</p>
                <p className="text-xs text-slate-400 mt-0.5">Secciones Didácticas</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-pink-300">8·16·32</p>
                <p className="text-xs text-slate-400 mt-0.5">Bits de Arquitectura</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-purple-300">4</p>
                <p className="text-xs text-slate-400 mt-0.5">Prácticas Interactivas</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-300">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Citas Académicas</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-pink-500/5 group">
              <img
                src="/src/assets/images/hero_microcontroller_chip_1793980255937.jpg"
                alt="Microcontrolador moderno sobre placa de circuito impreso con trazas pastel"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />

              {/* In-image caption tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/85 backdrop-blur-md rounded-xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Microcontrolador (MCU)</p>
                  <p className="text-[11px] text-slate-400">Sistema completo integrado en un solo sustrato de silicio</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
