import React, { useState } from 'react';
import { COMPONENTS_DATA } from '../data/microcontrollerData';
import { ComponentItem } from '../types/microcontroller';
import { Cpu, HardDrive, Sliders, Timer, Activity, Radio, AlertTriangle, Clock, Check } from 'lucide-react';

export const ComponentsSection: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('gpio');

  const selectedComp = COMPONENTS_DATA.find((c) => c.id === selectedCompId) || COMPONENTS_DATA[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'cpu':
        return <Cpu className="w-5 h-5" />;
      case 'flash_sram':
        return <HardDrive className="w-5 h-5" />;
      case 'gpio':
        return <Sliders className="w-5 h-5" />;
      case 'timers':
        return <Timer className="w-5 h-5" />;
      case 'adc_dac':
        return <Activity className="w-5 h-5" />;
      case 'comms':
        return <Radio className="w-5 h-5" />;
      case 'interrupts':
        return <AlertTriangle className="w-5 h-5" />;
      case 'clock':
        return <Clock className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: ComponentItem['accentColor'], isSelected: boolean) => {
    switch (color) {
      case 'rose':
        return isSelected
          ? 'bg-pink-950/40 border-pink-400/60 text-pink-200 ring-1 ring-pink-400/40'
          : 'hover:border-pink-500/30 text-slate-400 hover:text-slate-200';
      case 'lilac':
        return isSelected
          ? 'bg-purple-950/40 border-purple-400/60 text-purple-200 ring-1 ring-purple-400/40'
          : 'hover:border-purple-500/30 text-slate-400 hover:text-slate-200';
      case 'cyan':
        return isSelected
          ? 'bg-sky-950/40 border-sky-400/60 text-sky-200 ring-1 ring-sky-400/40'
          : 'hover:border-sky-500/30 text-slate-400 hover:text-slate-200';
      case 'mint':
        return isSelected
          ? 'bg-emerald-950/40 border-emerald-400/60 text-emerald-200 ring-1 ring-emerald-400/40'
          : 'hover:border-emerald-500/30 text-slate-400 hover:text-slate-200';
    }
  };

  return (
    <section id="componentes" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            <span>Sección 04</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Anatomía Funcional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            4. Componentes Principales del Hardware
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Cada bloque de hardware dentro del chip resuelve una necesidad física del mundo real:
            desde la generación de bases temporales con precisión de nanosegundos hasta la captura
            de señales analógicas continuas.
          </p>
        </div>

        {/* Interactive Component Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {COMPONENTS_DATA.map((comp) => {
            const isSelected = comp.id === selectedCompId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected ? 'bg-slate-900 shadow-md' : 'bg-slate-900/60 border-slate-800'
                } ${getColorClasses(comp.accentColor, isSelected)}`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center">
                  {getIcon(comp.id)}
                </div>
                <div className="font-mono text-xs font-bold tracking-wider">{comp.acronym}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Deep Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-1">
                <span>{selectedComp.acronym}</span>
                <span aria-hidden="true">·</span>
                <span>Módulo de Hardware</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {selectedComp.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {selectedComp.subtitle}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 self-start">
              <span className="text-slate-400 block text-[11px] mb-0.5">Parámetros Comunes</span>
              <span className="text-emerald-300 font-semibold">{selectedComp.typicalParameters}</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {selectedComp.description}
          </p>

          {/* Key functions grid */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Operaciones y Responsabilidades de Silicio
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectedComp.keyFunctions.map((func, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-300 leading-relaxed">{func}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
