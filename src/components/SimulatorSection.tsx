import React, { useState, useEffect, useRef } from 'react';
import { CODE_EXAMPLES } from '../data/microcontrollerData';
import { CodeExample } from '../types/microcontroller';
import {
  Play,
  Pause,
  Terminal,
  Activity,
  Sliders,
  Zap,
  Code2,
  Copy,
  CheckCheck,
  RotateCcw,
  Send,
  Lightbulb
} from 'lucide-react';

export const SimulatorSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Project 1: Blink LED State
  const [blinkRunning, setBlinkRunning] = useState<boolean>(true);
  const [blinkPeriod, setBlinkPeriod] = useState<number>(600); // ms
  const [ledState, setLedState] = useState<boolean>(false);

  // Project 2: ADC & PWM State
  const [potVoltage, setPotVoltage] = useState<number>(2.5); // 0V to 5.0V

  // Project 3: UART Terminal State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ sender: 'user' | 'mcu'; text: string; time: string }>>([
    { sender: 'mcu', text: 'UART1 Inicializado: 9600 baud, 8N1. Escribe HELP para ver comandos.', time: '00:00:01' }
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [uartLed, setUartLed] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Project 4: Interrupts State
  const [loopCounter, setLoopCounter] = useState<number>(0);
  const [interruptCount, setInterruptCount] = useState<number>(0);
  const [isInterruptFlashing, setIsInterruptFlashing] = useState<boolean>(false);

  // Blink LED Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (blinkRunning) {
      interval = setInterval(() => {
        setLedState((prev) => !prev);
      }, blinkPeriod);
    }
    return () => clearInterval(interval);
  }, [blinkRunning, blinkPeriod]);

  // Interrupt background loop counter effect
  useEffect(() => {
    const loopInterval = setInterval(() => {
      setLoopCounter((prev) => prev + 1);
    }, 100);
    return () => clearInterval(loopInterval);
  }, []);

  // Scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const currentExample: CodeExample = CODE_EXAMPLES[activeProject] || CODE_EXAMPLES[0];
  const activeLangData = currentExample.languages[selectedLanguageIndex] || currentExample.languages[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeLangData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UART Terminal Command Processing
  const handleSendUartCommand = (cmdText?: string) => {
    const command = (cmdText || terminalInput).trim();
    if (!command) return;

    const timestamp = new Date().toLocaleTimeString();
    const newHistory = [...terminalHistory, { sender: 'user' as const, text: `> ${command}`, time: timestamp }];

    const upper = command.toUpperCase();
    let response = '';

    if (upper === 'LED ON') {
      setUartLed(true);
      response = 'OK: Pin PB5 configurado en ALTO (LED Encendido)';
    } else if (upper === 'LED OFF') {
      setUartLed(false);
      response = 'OK: Pin PB5 configurado en BAJO (LED Apagado)';
    } else if (upper === 'STATUS') {
      response = `TELEMETRÍA MCU: Estado LED=${uartLed ? 'ACTIVO' : 'INACTIVO'} | ADC0=${Math.round(potVoltage * 204.6)} | Reloj=16MHz`;
    } else if (upper === 'READ ADC' || upper === 'ADC') {
      const raw = Math.round(potVoltage * 204.6);
      response = `ADC0: ${raw}/1023 (Voltaje medido: ${potVoltage.toFixed(2)} V)`;
    } else if (upper === 'HELP') {
      response = 'COMANDOS DISPONIBLES: LED ON | LED OFF | STATUS | ADC | CLEAR';
    } else if (upper === 'CLEAR') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      response = `ERROR: Comando no reconocido "${command}". Escribe HELP.`;
    }

    newHistory.push({ sender: 'mcu' as const, text: response, time: timestamp });
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Trigger External Interrupt
  const handleTriggerInterrupt = () => {
    setIsInterruptFlashing(true);
    setInterruptCount((prev) => prev + 1);
    setTimeout(() => setIsInterruptFlashing(false), 300);
  };

  // ADC calculations
  const adcRaw10Bit = Math.round((potVoltage / 5.0) * 1023);
  const pwmDutyPercent = Math.round((potVoltage / 5.0) * 100);
  const pwmDuty8Bit = Math.round((potVoltage / 5.0) * 255);

  return (
    <section id="laboratorio" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-300 uppercase tracking-wider mb-2">
            <span>Sección 10</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Banco Experimental</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            10. Ejemplos Prácticos de Programación y Simulador
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Experimenta en tiempo real con algoritmos fundamentales de control de periféricos:
            conmutación digital, conversión analógica ADC con PWM, comunicación UART y rutinas de interrupción (ISR).
          </p>
        </div>

        {/* Project Selector Segmented Control */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
          {CODE_EXAMPLES.map((proj, idx) => {
            const isSelected = activeProject === idx;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProject(idx);
                  setSelectedLanguageIndex(0);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80 ring-1 ring-pink-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {proj.title}
              </button>
            );
          })}
        </div>

        {/* 2-Zone Sandbox: Interactive Stage (Right) & Code / Concept Deck (Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left / Code Viewer & Explanations (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-pink-300">{currentExample.hardware}</span>
                <span className="text-xs text-slate-400 font-medium">{currentExample.difficulty}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{currentExample.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">{currentExample.description}</p>

              {/* Language Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-4 p-1 bg-slate-950 rounded-lg border border-slate-800">
                {currentExample.languages.map((lang, lIdx) => (
                  <button
                    key={lang.language}
                    onClick={() => setSelectedLanguageIndex(lIdx)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      selectedLanguageIndex === lIdx
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang.language}
                  </button>
                ))}
              </div>

              {/* Code Box */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#070B14]">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{activeLangData.language}</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono leading-relaxed text-slate-200 overflow-x-auto max-h-80">
                  <code>{activeLangData.code}</code>
                </pre>
              </div>

              {/* Line by line explanation */}
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Análisis Técnico del Algoritmo
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeLangData.explanation.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right / Interactive Live Simulator Stage (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Banco de Prueba de Silicio Virtual
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                EMULADOR EN VIVO
              </span>
            </div>

            {/* SIMULATOR 1: BLINK LED */}
            {activeProject === 0 && (
              <div className="flex flex-col gap-6">
                {/* Physical LED visualization */}
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-150 border-2 ${
                      ledState
                        ? 'bg-pink-500 border-pink-300 shadow-[0_0_50px_rgba(244,114,182,0.8)] scale-105'
                        : 'bg-slate-900 border-slate-800 shadow-none scale-100'
                    }`}
                  >
                    <Lightbulb className={`w-8 h-8 ${ledState ? 'text-white' : 'text-slate-600'}`} />
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">
                      Pin Digital PB5 (Arduino Pin 13)
                    </span>
                    <span
                      className={`text-sm font-mono font-extrabold ${
                        ledState ? 'text-pink-300' : 'text-slate-500'
                      }`}
                    >
                      {ledState ? 'ESTADO: ALTO (HIGH / 5.0V)' : 'ESTADO: BAJO (LOW / 0.0V)'}
                    </span>
                  </div>
                </div>

                {/* Oscilloscope Square Wave Graphic */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>Osciloscopio Virtual: Salida Pin PB5</span>
                    <span className="text-pink-300">F = {(1000 / (blinkPeriod * 2)).toFixed(2)} Hz</span>
                  </div>
                  <div className="h-16 flex items-center justify-center bg-slate-900/80 rounded-lg border border-slate-800/80 overflow-hidden px-4">
                    <div className="w-full h-8 flex items-end">
                      <div
                        className={`h-full border-r-2 border-pink-400 transition-all duration-75 ${
                          ledState ? 'bg-pink-500/20 w-1/2' : 'bg-transparent w-1/2'
                        }`}
                      />
                      <div
                        className={`h-full border-r-2 border-pink-400 transition-all duration-75 ${
                          !ledState ? 'bg-pink-500/20 w-1/2' : 'bg-transparent w-1/2'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Periodo de Retardo (_delay_ms):</span>
                      <span className="font-mono text-pink-300 font-bold">{blinkPeriod} ms</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="1500"
                      step="50"
                      value={blinkPeriod}
                      onChange={(e) => setBlinkPeriod(Number(e.target.value))}
                      className="w-full accent-pink-400 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setBlinkRunning(!blinkRunning)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        blinkRunning
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
                          : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                      }`}
                    >
                      {blinkRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{blinkRunning ? 'Pausar Reloj' : 'Iniciar Reloj'}</span>
                    </button>

                    <div className="text-right text-xs font-mono text-slate-400">
                      Registro PORTB: <span className="text-slate-200 font-bold">{ledState ? '0b00100000' : '0b00000000'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 2: ADC & PWM */}
            {activeProject === 1 && (
              <div className="flex flex-col gap-6">
                {/* Potentiometer Input Control */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-200 font-bold flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-purple-300" />
                      <span>Voltaje del Potenciómetro Analógico (A0)</span>
                    </span>
                    <span className="font-mono text-purple-300 font-bold text-sm">
                      {potVoltage.toFixed(2)} V
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5.0"
                    step="0.05"
                    value={potVoltage}
                    onChange={(e) => setPotVoltage(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                    <span>0.00 V (GND)</span>
                    <span>2.50 V</span>
                    <span>5.00 V (Vref)</span>
                  </div>
                </div>

                {/* ADC & PWM Dual Conversion Monitor */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">Lectura ADC (10 bits)</span>
                    <span className="text-xl font-mono font-extrabold text-purple-300">{adcRaw10Bit}</span>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      Hex: 0x{adcRaw10Bit.toString(16).toUpperCase().padStart(3, '0')}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">Ciclo de Trabajo PWM</span>
                    <span className="text-xl font-mono font-extrabold text-sky-300">{pwmDutyPercent}%</span>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      Valor 8 bits: {pwmDuty8Bit}/255
                    </span>
                  </div>
                </div>

                {/* Live PWM Waveform and Modulated LED */}
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <span className="text-xs font-mono text-slate-400 block mb-2">
                      Forma de Onda PWM Generada (Pin 9)
                    </span>
                    <div className="h-10 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center px-1">
                      <div
                        className="h-6 bg-gradient-to-r from-sky-500 to-purple-500 rounded transition-all duration-75"
                        style={{ width: `${Math.max(2, pwmDutyPercent)}%` }}
                      />
                    </div>
                  </div>

                  {/* Brightness modulated indicator */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-12 h-12 rounded-full border border-sky-300/40 flex items-center justify-center transition-all duration-100"
                      style={{
                        backgroundColor: `rgba(56, 189, 248, ${Math.max(0.1, potVoltage / 5.0)})`,
                        boxShadow: `0 0 ${Math.round((potVoltage / 5.0) * 35)}px rgba(56, 189, 248, ${potVoltage / 5.0})`
                      }}
                    >
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1">Brillo LED</span>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 3: UART SERIAL TERMINAL */}
            {activeProject === 2 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Monitor Serie UART: /dev/ttyUSB0 (9600 8N1)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px]">LED Status:</span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        uartLed ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-700'
                      }`}
                    />
                  </div>
                </div>

                {/* Terminal Screen */}
                <div className="h-64 p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs overflow-y-auto space-y-2">
                  {terminalHistory.map((line, i) => (
                    <div
                      key={i}
                      className={`leading-relaxed ${
                        line.sender === 'user' ? 'text-pink-300' : 'text-emerald-300'
                      }`}
                    >
                      <span className="text-slate-600 mr-2 text-[10px]">[{line.time}]</span>
                      <span>{line.text}</span>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Quick Command Buttons */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleSendUartCommand('LED ON')}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
                  >
                    LED ON
                  </button>
                  <button
                    onClick={() => handleSendUartCommand('LED OFF')}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
                  >
                    LED OFF
                  </button>
                  <button
                    onClick={() => handleSendUartCommand('STATUS')}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
                  >
                    STATUS
                  </button>
                  <button
                    onClick={() => handleSendUartCommand('ADC')}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
                  >
                    READ ADC
                  </button>
                  <button
                    onClick={() => handleSendUartCommand('CLEAR')}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 cursor-pointer"
                  >
                    CLEAR
                  </button>
                </div>

                {/* Input Prompt */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendUartCommand();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Escribe un comando (ej: HELP, LED ON, STATUS)..."
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-pink-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-pink-500/20 border border-pink-400/40 text-pink-200 hover:bg-pink-500/30 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </form>
              </div>
            )}

            {/* SIMULATOR 4: HARDWARE INTERRUPT (ISR) */}
            {activeProject === 3 && (
              <div className="flex flex-col gap-6">
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-400">Bucle Principal (Main Loop continuo):</span>
                    <span className="font-mono text-emerald-300 font-bold">ACTIVO</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Ciclos de CPU en segundo plano:</span>
                    <span className="text-lg font-bold text-white tabular-nums">{loopCounter}</span>
                  </div>
                </div>

                {/* Physical Push Button for Interrupt */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={handleTriggerInterrupt}
                    className={`px-6 py-4 rounded-2xl font-mono text-sm font-bold tracking-wide uppercase transition-all duration-100 cursor-pointer shadow-lg active:scale-95 flex items-center gap-2 ${
                      isInterruptFlashing
                        ? 'bg-amber-400 text-slate-950 shadow-amber-400/50 scale-95 ring-4 ring-amber-300/40'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 shadow-pink-500/20'
                    }`}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Pulsar Botón de Hardware (INT0)</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center max-w-sm">
                    Al hacer clic, el hardware genera un flanco de bajada (falling edge). La CPU
                    suspende el bucle principal de inmediato y atiende la función <code>botonISR()</code>.
                  </p>
                </div>

                {/* ISR Metrics Counter */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Total Interrupciones Atendidas (ISR):</span>
                    <span className="text-2xl font-mono font-extrabold text-amber-300 tabular-nums">
                      {interruptCount}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400 block">Variable en Memoria:</span>
                    <span className="text-xs font-mono font-semibold text-purple-300">volatile unsigned long</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
