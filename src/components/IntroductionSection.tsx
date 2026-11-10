import React, { useState } from 'react';
import { TIMELINE_DATA } from '../data/microcontrollerData';
import { Calendar, Cpu, Sparkles, History, ChevronRight } from 'lucide-react';

export const IntroductionSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(2); // Default 8051

  return (
    <section id="introduccion" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">
            <span>Sección 01</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Historia y Origen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            1. Introducción a los Microcontroladores
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Un microcontrolador (MCU, por sus siglas en inglés <em>Microcontroller Unit</em>) es un
            sistema de computación completo integrado en un único chip de silicio. A diferencia de un
            procesador de PC que requiere componentes externos, el MCU integra CPU, memoria y periféricos en una pastilla milimétrica.
          </p>
        </div>

        {/* 3 Core Conceptual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-pink-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-400/20 text-pink-300 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">¿Qué es en Esencia?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Es un <strong>computador en un chip</strong> concebido para gobernar una sola tarea
              específica de manera ininterrumpida, económica y con altísima confiabilidad física durante años.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-300 flex items-center justify-center mb-4">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Origen y Evolución</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nacieron en los años 70 para reemplazar costosos circuitos lógicos discretos con compuertas TTL.
              Evolucionaron desde calculadoras básicas y teclados hasta nodos inteligentes con inteligencia artificial (TinyML).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Presencia en el Mundo</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Se producen anualmente más de <strong>30.000 millones</strong> de unidades.
              Un automóvil moderno contiene entre 50 y 120 microcontroladores para frenos, motor, airbags y climatización.
            </p>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-300" />
                <span>Línea del Tiempo Interactiva de la Microelectrónica</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Haz clic en cada hito histórico para descubrir cómo evolucionaron las arquitecturas.
              </p>
            </div>
            <div className="text-xs font-mono text-purple-300">
              Hito {selectedMilestone + 1} de {TIMELINE_DATA.length}
            </div>
          </div>

          {/* Timeline Milestones Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
            {TIMELINE_DATA.map((item, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <button
                  key={item.year}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`p-3 text-left rounded-xl transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-400/60 shadow-md shadow-purple-500/10 ring-1 ring-purple-400/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`block font-mono text-xs font-bold ${isSelected ? 'text-purple-300' : 'text-slate-400'}`}>
                    {item.year}
                  </span>
                  <span className={`block text-xs font-medium truncate mt-0.5 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div className="p-6 rounded-xl bg-slate-900/80 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
                <span>{TIMELINE_DATA[selectedMilestone].year}</span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-semibold">{TIMELINE_DATA[selectedMilestone].title}</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {TIMELINE_DATA[selectedMilestone].milestone}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {TIMELINE_DATA[selectedMilestone].description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                disabled={selectedMilestone === 0}
                onClick={() => setSelectedMilestone((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
              >
                Anterior
              </button>
              <button
                disabled={selectedMilestone === TIMELINE_DATA.length - 1}
                onClick={() => setSelectedMilestone((prev) => Math.min(TIMELINE_DATA.length - 1, prev + 1))}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-500/30 cursor-pointer flex items-center gap-1"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
