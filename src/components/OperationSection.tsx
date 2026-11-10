import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ArrowRight, Activity, Clock, Zap } from 'lucide-react';

interface InstructionStep {
  pc: string;
  asm: string;
  description: string;
  stage: 'FETCH' | 'DECODE' | 'EXECUTE' | 'WRITEBACK';
  registers: { [key: string]: string };
  signals: string;
}

const SIMULATION_STEPS: InstructionStep[] = [
  {
    pc: '0x0000',
    asm: 'LDI R16, 0x20',
    description: 'Búsqueda: Se lee la instrucción de Flash que carga el valor inmediato 0x20 (bit 5 en alto) en el registro R16.',
    stage: 'FETCH',
    registers: { PC: '0x0000', IR: 'LDI R16, 0x20', R16: '0x00', DDRB: '0x00', PORTB: '0x00', LED: 'APAGADO' },
    signals: 'Bus de Instrucción activo · Program Counter incrementa'
  },
  {
    pc: '0x0000',
    asm: 'LDI R16, 0x20',
    description: 'Decodificación y Ejecución: La unidad de control interpreta el opcode LDI y carga 0x20 (binario: 00100000) en R16.',
    stage: 'EXECUTE',
    registers: { PC: '0x0001', IR: 'LDI R16, 0x20', R16: '0x20', DDRB: '0x00', PORTB: '0x00', LED: 'APAGADO' },
    signals: 'ALU transfiere valor inmediato · R16 actualizado'
  },
  {
    pc: '0x0001',
    asm: 'OUT DDRB, R16',
    description: 'Búsqueda: Se lee la instrucción OUT para transferir el contenido de R16 al registro de dirección del Puerto B.',
    stage: 'FETCH',
    registers: { PC: '0x0001', IR: 'OUT DDRB, R16', R16: '0x20', DDRB: '0x00', PORTB: '0x00', LED: 'APAGADO' },
    signals: 'Lectura de memoria Flash · Decodificador de periféricos preparado'
  },
  {
    pc: '0x0001',
    asm: 'OUT DDRB, R16',
    description: 'Ejecución y Almacenamiento: El pin PB5 queda configurado como SALIDA digital en el registro DDRB.',
    stage: 'WRITEBACK',
    registers: { PC: '0x0002', IR: 'OUT DDRB, R16', R16: '0x20', DDRB: '0x20', PORTB: '0x00', LED: 'CONFIGURADO' },
    signals: 'Bus de datos de I/O escribe en DDRB · Pin PB5 modo Salida'
  },
  {
    pc: '0x0002',
    asm: 'SBI PORTB, 5',
    description: 'Búsqueda: Se lee SBI (Set Bit in I/O Register) para poner en nivel alto el pin del LED.',
    stage: 'FETCH',
    registers: { PC: '0x0002', IR: 'SBI PORTB, 5', R16: '0x20', DDRB: '0x20', PORTB: '0x00', LED: 'APAGADO' },
    signals: 'Decodificador activa lógica de manipulación de bit único'
  },
  {
    pc: '0x0002',
    asm: 'SBI PORTB, 5',
    description: 'Ejecución: El bit 5 de PORTB pasa a 1 (5V / 3.3V). La corriente fluye a través del LED y se ILUMINA.',
    stage: 'EXECUTE',
    registers: { PC: '0x0003', IR: 'SBI PORTB, 5', R16: '0x20', DDRB: '0x20', PORTB: '0x20', LED: 'ENCENDIDO ✨' },
    signals: 'Transistor de salida conmuta a VCC · Corriente al pin PB5'
  },
  {
    pc: '0x0003',
    asm: 'CBI PORTB, 5',
    description: 'Ejecución: CBI (Clear Bit in I/O Register) pone el bit 5 de PORTB a 0 (GND / 0V). El LED se APAGA.',
    stage: 'WRITEBACK',
    registers: { PC: '0x0004', IR: 'CBI PORTB, 5', R16: '0x20', DDRB: '0x20', PORTB: '0x00', LED: 'APAGADO' },
    signals: 'Transistor commuta a GND · LED desenergizado'
  },
  {
    pc: '0x0004',
    asm: 'RJMP 0x0002',
    description: 'Salto Relativo: El Program Counter (PC) se recarga con la dirección 0x0002, formando el bucle infinito de parpadeo.',
    stage: 'EXECUTE',
    registers: { PC: '0x0002', IR: 'RJMP 0x0002', R16: '0x20', DDRB: '0x20', PORTB: '0x00', LED: 'EN BUCLE' },
    signals: 'Lógica de salto escribe nuevo valor en Program Counter'
  }
];

export const OperationSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % SIMULATION_STEPS.length);
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const step = SIMULATION_STEPS[currentStep];

  const getStageBadgeColor = (stage: InstructionStep['stage']) => {
    switch (stage) {
      case 'FETCH':
        return 'bg-pink-500/20 text-pink-300 border-pink-400/40';
      case 'DECODE':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/40';
      case 'EXECUTE':
        return 'bg-sky-500/20 text-sky-300 border-sky-400/40';
      case 'WRITEBACK':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
    }
  };

  return (
    <section id="funcionamiento" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">
            <span>Sección 05</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Ciclo de Máquina y Tiempos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            5. Funcionamiento: El Ciclo de Instrucción
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Cada instrucción en código binario atraviesa un ciclo riguroso de fases sincronizadas
            por el oscilador de reloj: Búsqueda (<em>Fetch</em>), Decodificación (<em>Decode</em>),
            Ejecución (<em>Execute</em>) y Almacenamiento (<em>Writeback</em>).
          </p>
        </div>

        {/* Interactive Instruction Cycle Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-300" />
                <h3 className="text-lg font-bold text-white">
                  Simulador de Ejecución Paso a Paso en Silicio
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Observa cómo los registros internos y las señales de bus cambian instrucción por instrucción.
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
                    : 'bg-pink-500/20 text-pink-200 border border-pink-400/40 hover:bg-pink-500/30'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pausar' : 'Auto Play'}</span>
              </button>

              <button
                disabled={isPlaying}
                onClick={() => setCurrentStep((prev) => (prev + 1) % SIMULATION_STEPS.length)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer disabled:opacity-40"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Paso Siguiente</span>
              </button>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(0);
                }}
                className="p-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all cursor-pointer"
                title="Reiniciar Simulación"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive State Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Current instruction and status */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Paso {currentStep + 1} de {SIMULATION_STEPS.length}
                </span>
                <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-full border ${getStageBadgeColor(step.stage)}`}>
                  FASE: {step.stage}
                </span>
              </div>

              {/* Opcode Banner */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-0.5">Program Counter (Dirección Flash)</span>
                  <span className="text-lg font-mono font-bold text-pink-300">{step.pc}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400 block mb-0.5">Instrucción Máquina</span>
                  <span className="text-lg font-mono font-bold text-purple-200">{step.asm}</span>
                </div>
              </div>

              {/* Micro-operation description */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
                {step.description}
              </div>

              {/* Bus signals indicator */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-sky-300 font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Señales de bus: {step.signals}</span>
              </div>
            </div>

            {/* Right: Live Hardware Registers Panel */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Estado en Vivo de los Registros (CPU & I/O)
              </h4>
              <div className="space-y-2.5 font-mono text-xs">
                {Object.entries(step.registers).map(([reg, val]) => (
                  <div key={reg} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 font-bold">{reg}</span>
                    <span
                      className={`font-semibold ${
                        reg === 'LED'
                          ? val.includes('ENCENDIDO')
                            ? 'text-pink-300 animate-pulse'
                            : 'text-slate-400'
                          : 'text-emerald-300'
                      }`}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interrupt Service Routine (ISR) Flow */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-300" />
            <span>Manejo de Interrupciones en Tiempo Real (ISR Flow)</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-3xl">
            Cuando se produce una interrupción de hardware (por ejemplo, el pulsador de emergencia o un byte recibido por UART),
            el microcontrolador no espera a que termine el bucle principal:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono font-bold text-pink-300">1. Disparo de Señal</span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                El pin detecta un flanco de bajada (falling edge). La bandera de interrupción se activa en hardware.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono font-bold text-purple-300">2. Salvado de Contexto</span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                La CPU suspende la instrucción actual y empuja el Program Counter (PC) y el Status Register a la pila (Stack SRAM).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono font-bold text-sky-300">3. Salto al Vector ISR</span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                El vector apunta a la dirección de memoria de la función de interrupción y ejecuta el código urgente.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs font-mono font-bold text-emerald-300">4. Retorno Atómico (RETI)</span>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Se desapila el contexto original y el procesador retoma la tarea previa con cero pérdida de datos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
