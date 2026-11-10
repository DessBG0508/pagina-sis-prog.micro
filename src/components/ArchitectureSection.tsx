import React, { useState } from 'react';
import { ARCHITECTURE_BLOCKS } from '../data/microcontrollerData';
import { InternalBlock } from '../types/microcontroller';
import { Layers, ArrowRightLeft, Cpu, Database, Network, HardDrive, Info } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<InternalBlock>(ARCHITECTURE_BLOCKS[0]);
  const [archModel, setArchModel] = useState<'harvard' | 'von_neumann'>('harvard');

  return (
    <section id="arquitectura" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">
            <span>Sección 03</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Estructura del Silicio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            3. Arquitectura Interna del Microcontrolador
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            La arquitectura interna define la organización de la CPU, las memorias y los caminos
            físicos (buses) a través de los cuales fluyen las instrucciones y los datos en cada ciclo de reloj.
          </p>
        </div>

        {/* Harvard vs Von Neumann Comparison Toggle */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-purple-300" />
                <span>Modelos de Arquitectura: Harvard vs Von Neumann</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                La gran decisión de diseño que separa el rendimiento de los microcontroladores embebidos.
              </p>
            </div>

            {/* Toggle switch */}
            <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setArchModel('harvard')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  archModel === 'harvard'
                    ? 'bg-purple-500/20 text-purple-200 border border-purple-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Arquitectura Harvard (Predominante en MCUs)
              </button>
              <button
                onClick={() => setArchModel('von_neumann')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  archModel === 'von_neumann'
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Von Neumann (Tradicional)
              </button>
            </div>
          </div>

          {archModel === 'harvard' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <h4 className="text-base font-bold text-purple-200 mb-2">
                  Buses Físicos Separados para Código y Datos
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  En la arquitectura Harvard, la memoria de programa (Flash) y la memoria de datos (SRAM) poseen
                  sus propios buses de direcciones y datos independientes. Esto permite a la CPU buscar la siguiente
                  instrucción al mismo tiempo exacto que lee o escribe un dato de variable, eliminando el cuello de botella.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-purple-200 font-mono">
                    AVR (ATmega)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-purple-200 font-mono">
                    Microchip PIC
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-purple-200 font-mono">
                    ARM Cortex-M (Harvard Modificada)
                  </span>
                </div>
              </div>
              <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs font-mono text-slate-300">
                <div className="text-purple-300 font-bold mb-2">// Flujo Harvard Simultáneo</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 mb-2 text-pink-300">
                  Bus de Instrucción ──→ [Memoria Flash] (Fetch Instrucción N+1)
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-sky-300">
                  Bus de Datos ────────→ [Memoria SRAM] (Lectura Dato N)
                </div>
                <p className="mt-2 text-[11px] text-emerald-400">✓ Rendimiento de 1 ciclo por instrucción (Pipelined)</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <h4 className="text-base font-bold text-sky-200 mb-2">
                  Bus Unificado Compartido para Código y Datos
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  El procesador comparte el mismo conjunto de líneas de bus tanto para traer instrucciones como para leer/escribir operandos.
                  No es posible acceder a memoria de programa y datos en el mismo ciclo, requiriendo multiplexación temporal
                  conocida como el <em>Cuello de Botella de Von Neumann</em>.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-200 font-mono">
                    TI MSP430
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-200 font-mono">
                    Intel x86 (PC)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-800/60 text-sky-200 font-mono">
                    Motorola 68HC11
                  </span>
                </div>
              </div>
              <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/80 border border-sky-500/20 text-xs font-mono text-slate-300">
                <div className="text-sky-300 font-bold mb-2">// Flujo Von Neumann Secuencial</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 mb-2 text-slate-300">
                  Ciclo 1: Bus Único ──→ Trae Instrucción desde Memoria
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  Ciclo 2: Bus Único ──→ Trae Dato / Operando de Memoria
                </div>
                <p className="mt-2 text-[11px] text-amber-300">! Requiere múltiples ciclos de reloj secuenciales</p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Block Explorer with 3D Architecture Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Architecture Render Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              <img
                src="/src/assets/images/microcontroller_architecture_1793980256045.jpg"
                alt="Render isométrico de la arquitectura interna de un microcontrolador con CPU, Flash, SRAM y buses"
                className="w-full h-auto object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-900/90 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Matriz de Silicio Embebido</span>
                  <span className="text-slate-400 font-mono">ARM Cortex-M Architecture</span>
                </div>
              </div>
            </div>

            {/* Quick interactive block selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ARCHITECTURE_BLOCKS.map((block) => {
                const isSelected = selectedBlock.id === block.id;
                return (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    className={`p-3 text-left rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-pink-400/50 text-white shadow-sm ring-1 ring-pink-400/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="font-semibold text-slate-200 truncate">{block.name}</div>
                    <div className="text-[11px] text-slate-400 capitalize mt-0.5">{block.category}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Deep Dive on Selected Block */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-pink-300 mb-2">
              <span>Módulo Seleccionado</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{selectedBlock.category}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {selectedBlock.name}
            </h3>

            <p className="text-sm font-medium text-pink-200 mb-4 leading-relaxed">
              {selectedBlock.summary}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {selectedBlock.details}
            </p>

            {/* Specifications list */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Especificaciones de Silicio
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedBlock.technicalSpecs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hardware Registers */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Registros de Hardware Clave
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedBlock.registers.map((reg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-950 border border-slate-800 text-purple-200"
                  >
                    {reg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
