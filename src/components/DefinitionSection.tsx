import React, { useState } from 'react';
import { MCU_MPU_COMPARISONS } from '../data/microcontrollerData';
import { Cpu, Zap, Clock, ShieldCheck, CheckCircle2, Sliders } from 'lucide-react';

export const DefinitionSection: React.FC = () => {
  const [activeComparisonIndex, setActiveComparisonIndex] = useState<number>(0);

  return (
    <section id="definicion" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
            <span>Sección 02</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Conceptos Fundamentales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            2. Definición y Características Técnicas
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Un microcontrolador es un circuito integrado monolítico diseñado para gobernar operaciones
            electrónicas con control estricto de tiempos. Comprender sus diferencias con un microprocesador general
            es la clave de la ingeniería de sistemas embebidos.
          </p>
        </div>

        {/* 4 Essential Characteristics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-300 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Determinismo Temporal</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Responde a eventos externos en un número exacto y predecible de nanosegundos (Hard Real-Time),
              indispensable para activar bolsas de aire o inyectores automotrices.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-300 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Ultra Bajo Consumo</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consumos en reposo inferiores a 100 nA. Pueden permanecer monitorizando sensores con una simple
              batería tipo botón CR2032 durante más de 5 a 10 años ininterrumpidos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-300 flex items-center justify-center mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Periféricos Autónomos</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Los módulos PWM, ADC y DMA procesan señales y transfieren datos a la memoria de forma autónoma,
              permitiendo que el núcleo de CPU duerma para ahorrar energía.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Robustez Industrial</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rangos de temperatura extendidos (-40 °C a +125 °C), circuitos de reinicio por caída de tensión (Brown-out)
              y alta inmunidad al ruido electromagnético.
            </p>
          </div>
        </div>

        {/* Interactive MCU vs MPU Deep Comparison */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-pink-300" />
                <span>Comparativa Técnica: Microcontrolador (MCU) vs Microprocesador (MPU)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Selecciona una dimensión para comparar las diferencias arquitectónicas clave.
              </p>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            {MCU_MPU_COMPARISONS.map((comp, idx) => {
              const active = activeComparisonIndex === idx;
              return (
                <button
                  key={comp.feature}
                  onClick={() => setActiveComparisonIndex(idx)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    active
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {comp.feature}
                </button>
              );
            })}
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MCU Box */}
            <div className="p-6 rounded-xl bg-slate-900/70 border border-pink-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-pink-300 tracking-wider uppercase">
                  Microcontrolador (MCU)
                </span>
                <span className="text-[11px] text-slate-400">Ej. STM32, ESP32, AVR</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                {MCU_MPU_COMPARISONS[activeComparisonIndex].feature}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {MCU_MPU_COMPARISONS[activeComparisonIndex].mcu}
              </p>
            </div>

            {/* MPU Box */}
            <div className="p-6 rounded-xl bg-slate-900/70 border border-sky-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-sky-300 tracking-wider uppercase">
                  Microprocesador (MPU)
                </span>
                <span className="text-[11px] text-slate-400">Ej. Intel Core, AMD, Apple M, ARM Cortex-A</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                {MCU_MPU_COMPARISONS[activeComparisonIndex].feature}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {MCU_MPU_COMPARISONS[activeComparisonIndex].mpu}
              </p>
            </div>
          </div>

          {/* Explanatory footer callout */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">Conclusión de Ingeniería: </strong>
              {MCU_MPU_COMPARISONS[activeComparisonIndex].description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
