import React, { useState } from 'react';
import { FAMILIES_DATA } from '../data/microcontrollerData';
import { McuFamily } from '../types/microcontroller';
import { Cpu, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

export const FamiliesSection: React.FC = () => {
  const [filterBits, setFilterBits] = useState<string>('all');
  const [selectedFamily, setSelectedFamily] = useState<McuFamily>(FAMILIES_DATA[0]);

  const filteredFamilies = filterBits === 'all'
    ? FAMILIES_DATA
    : FAMILIES_DATA.filter((f) => f.bits === filterBits);

  return (
    <section id="familias" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
            <span>Sección 06</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Ecosistema y Fabricantes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            6. Tipos y Familias de Microcontroladores
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            La industria ofrece soluciones escalables que van desde diminutos integrados de 8 bits para
            controles de bajo coste hasta potentes procesadores de 32 bits con unidades de punto flotante
            y transceptores inalámbricos integrados.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterBits('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterBits === 'all'
                  ? 'bg-purple-500/20 text-purple-200 border border-purple-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todas las Familias ({FAMILIES_DATA.length})
            </button>
            <button
              onClick={() => setFilterBits('8-bit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterBits === '8-bit'
                  ? 'bg-pink-500/20 text-pink-200 border border-pink-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              8 Bits (AVR, PIC)
            </button>
            <button
              onClick={() => setFilterBits('16-bit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterBits === '16-bit'
                  ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              16 Bits (MSP430)
            </button>
            <button
              onClick={() => setFilterBits('32-bit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filterBits === '32-bit'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              32 Bits (STM32, ESP32, RP2040)
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Mostrando <span className="font-mono text-purple-300">{filteredFamilies.length}</span> arquitecturas
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFamilies.map((fam) => {
            const isSelected = selectedFamily.name === fam.name;
            return (
              <div
                key={fam.name}
                onClick={() => setSelectedFamily(fam)}
                className={`p-6 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-purple-400/50 shadow-xl shadow-purple-500/5 ring-1 ring-purple-400/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-purple-300">
                      {fam.bits}
                    </span>
                    <span className="text-xs text-slate-400">{fam.manufacturer}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{fam.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{fam.keyFeatures}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center justify-between mb-1">
                    <span>Frecuencia:</span>
                    <span className="font-mono text-slate-200">{fam.clockSpeed}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Memoria Flash:</span>
                    <span className="font-mono text-slate-200">{fam.flashRange}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Ideal para: {fam.bestFor}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Family Detailed Technical Breakdown Table */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-purple-300 mb-1">Ficha Técnica Detallada</div>
              <h3 className="text-xl font-bold text-white">{selectedFamily.name}</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-lg">
              {selectedFamily.bits} Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Arquitectura Interna</span>
              <span className="text-xs font-semibold text-slate-200 leading-tight block">
                {selectedFamily.architecture}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Rango de Memoria RAM</span>
              <span className="text-xs font-mono font-bold text-pink-300">
                {selectedFamily.ramRange}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Rango de Memoria Flash</span>
              <span className="text-xs font-mono font-bold text-purple-300">
                {selectedFamily.flashRange}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Velocidad de Reloj</span>
              <span className="text-xs font-mono font-bold text-sky-300">
                {selectedFamily.clockSpeed}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-medium">Chips y placas representativas:</span>
            {selectedFamily.exampleChips.map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-mono"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
