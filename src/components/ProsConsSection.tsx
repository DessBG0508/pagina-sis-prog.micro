import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface DecisionState {
  needsGui: boolean | null;
  batteryPowered: boolean | null;
  strictRealTime: boolean | null;
}

export const ProsConsSection: React.FC = () => {
  const [decision, setDecision] = useState<DecisionState>({
    needsGui: null,
    batteryPowered: null,
    strictRealTime: null
  });

  const resetDecision = () => {
    setDecision({ needsGui: null, batteryPowered: null, strictRealTime: null });
  };

  const getRecommendation = () => {
    if (decision.needsGui === null || decision.batteryPowered === null || decision.strictRealTime === null) {
      return null;
    }

    if (decision.needsGui && !decision.strictRealTime) {
      return {
        title: 'Microprocesador / Single Board Computer (MPU / SBC)',
        chip: 'Raspberry Pi 5 / NXP i.MX8 / STM32MP1',
        reason: 'Tu proyecto requiere renderizado gráfico pesado, sistema operativo multitarea completo (Linux) y no depende de tiempos estrictos a nivel de nanosegundos.',
        color: 'text-sky-300'
      };
    }

    if (decision.batteryPowered && decision.strictRealTime) {
      return {
        title: 'Microcontrolador Ultra Bajo Consumo (MCU)',
        chip: 'STM32L4 / TI MSP430FR / Silicon Labs EFM32',
        reason: 'El determinismo en tiempo real y la autonomía energética para operar con baterías durante meses o años hacen indispensable un microcontrolador dedicado.',
        color: 'text-emerald-300'
      };
    }

    if (decision.needsGui && decision.strictRealTime) {
      return {
        title: 'Arquitectura Híbrida Asimétrica (Heterogeneous Multi-Core)',
        chip: 'NXP i.MX RT1170 o STM32MP1 (Cortex-A7 + Cortex-M4)',
        reason: 'La mejor solución es un chip híbrido: el núcleo MPU corre la interfaz gráfica y la pila de red (Linux), mientras el núcleo MCU embebido gestiona los motores y sensores en tiempo real sin interrupciones.',
        color: 'text-purple-300'
      };
    }

    return {
      title: 'Microcontrolador de Propósito General (MCU)',
      chip: 'ESP32 / STM32F4 / RP2040',
      reason: 'Un microcontrolador estándar de 32 bits es la opción más económica, confiable y energéticamente eficiente para tu desarrollo.',
      color: 'text-pink-300'
    };
  };

  const recommendation = getRecommendation();

  return (
    <section id="ventajas-desventajas" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">
            <span>Sección 09</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Balance de Ingeniería</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            9. Ventajas y Desventajas de los Microcontroladores
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Ninguna tecnología es universalmente superior para todos los problemas. El ingeniero debe
            sopesar los beneficios del bajo costo y tiempo real frente a los límites de memoria y cómputo.
          </p>
        </div>

        {/* 2-Column Pros & Cons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Ventajas */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ventajas Competitivas</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-6">¿Por qué Elegir un Microcontrolador?</h3>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Integración y Simplicidad de Placa:</strong>
                  Al integrar oscilador, memoria y periféricos en el chip, la placa PCB requiere mínimos componentes externos.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Costo Excepcionalmente Bajo:</strong>
                  Disponibles en volúmenes industriales desde centavos de dólar ($0.15 a $3.00 USD).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Arranque Instantáneo (Cold Boot):</strong>
                  Comienzan a ejecutar código en microsegundos tras encenderse, sin tiempos de carga de sistema operativo.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Determinismo Puro de Hardware:</strong>
                  Las respuestas a interrupciones no sufren retrasos por hilos de segundo plano o procesos basura del SO.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Eficiencia Energética Inigualable:</strong>
                  Capaces de hibernar consumiendo nanoamperios y despertar en microsegundos.
                </div>
              </li>
            </ul>
          </div>

          {/* Desventajas */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-rose-500/30">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-300 uppercase mb-4">
              <XCircle className="w-4 h-4" />
              <span>Limitaciones y Desafíos</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-6">¿Cuáles son sus Restricciones?</h3>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Memoria Estrictamente Limitada:</strong>
                  Con pocos kilobytes de RAM, algoritmos de visión por computadora pesada o modelos de IA grandes son inviables.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Sin Unidad de Manejo de Memoria (MMU):</strong>
                  La gran mayoría no posee MMU para memoria virtual, impidiendo ejecutar sistemas como Linux convencional.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Depuración Compleja en Hardware:</strong>
                  Requieren sondas de depuración física (JTAG, SWD, ST-Link) y osciloscopios para diagnosticar problemas de temporización.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Cálculo de Punto Flotante Restringido:</strong>
                  En microcontroladores de 8 y 16 bits sin FPU, las operaciones matemáticas complejas se emulan por software siendo lentas.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <div>
                  <strong className="text-white block font-semibold">Portabilidad Reducida:</strong>
                  El código bare-metal escrito para registros de AVR no es directamente compatible con los registros de un PIC o STM32.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Decision Assistant */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-300" />
                <span>Asistente Interactivo de Decisión de Hardware</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Responde estas 3 preguntas de diseño para recibir una recomendación de arquitectura personalizada.
              </p>
            </div>
            <button
              onClick={resetDecision}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reiniciar Preguntas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Question 1 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-pink-300 block mb-1">Pregunta 1</span>
              <h4 className="text-sm font-semibold text-white mb-4">
                ¿Tu dispositivo necesita una pantalla táctil compleja o interfaz gráfica fluida (GUI)?
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setDecision({ ...decision, needsGui: true })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    decision.needsGui === true
                      ? 'bg-pink-500/20 text-pink-200 border-pink-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sí (Pantalla Completa)
                </button>
                <button
                  onClick={() => setDecision({ ...decision, needsGui: false })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    decision.needsGui === false
                      ? 'bg-slate-800 text-white border-slate-600'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  No / Display Básico
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-purple-300 block mb-1">Pregunta 2</span>
              <h4 className="text-sm font-semibold text-white mb-4">
                ¿Debe funcionar con baterías pequeñas durante meses o años sin recargarse?
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setDecision({ ...decision, batteryPowered: true })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    decision.batteryPowered === true
                      ? 'bg-purple-500/20 text-purple-200 border-purple-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sí (Ultra Ahorro)
                </button>
                <button
                  onClick={() => setDecision({ ...decision, batteryPowered: false })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    decision.batteryPowered === false
                      ? 'bg-slate-800 text-white border-slate-600'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  No (Conectado a Red)
                </button>
              </div>
            </div>

            {/* Question 3 */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-sky-300 block mb-1">Pregunta 3</span>
              <h4 className="text-sm font-semibold text-white mb-4">
                ¿El control físico de motores o sensores requiere tiempos estrictos (nanosegundos)?
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setDecision({ ...decision, strictRealTime: true })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    decision.strictRealTime === true
                      ? 'bg-sky-500/20 text-sky-200 border-sky-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sí (Tiempo Real Duro)
                </button>
                <button
                  onClick={() => setDecision({ ...decision, strictRealTime: false })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    decision.strictRealTime === false
                      ? 'bg-slate-800 text-white border-slate-600'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  No Crítico (ms aceptable)
                </button>
              </div>
            </div>
          </div>

          {/* Assistant Output Result */}
          {recommendation ? (
            <div className="p-6 rounded-xl bg-slate-900/90 border border-purple-500/40">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <span>Diagnóstico Final de Arquitectura</span>
                <span aria-hidden="true">·</span>
                <span>Calculado</span>
              </div>
              <h4 className={`text-xl font-bold mb-2 ${recommendation.color}`}>
                {recommendation.title}
              </h4>
              <div className="text-xs font-mono text-slate-400 mb-3">
                Chips Sugeridos: <span className="text-slate-200 font-bold">{recommendation.chip}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-400">
              Selecciona una opción en las 3 preguntas superiores para calcular la arquitectura recomendada.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
