import React, { useState } from 'react';
import { Code2, Terminal, Cpu, Check, Layers, Copy, CheckCheck } from 'lucide-react';

interface LanguageDetail {
  id: string;
  name: string;
  badge: string;
  level: string;
  efficiency: string;
  footprint: string;
  bestUsedFor: string;
  sampleCode: string;
  summary: string;
  pros: string[];
  cons: string[];
}

const LANGUAGES_DATA: LanguageDetail[] = [
  {
    id: 'c_embedded',
    name: 'C Embebido (Embedded C)',
    badge: 'Estándar Industrial',
    level: 'Medio / Bajo Nivel',
    efficiency: '98% - 100% de la velocidad nativa',
    footprint: 'Mínima (< 200 bytes base)',
    bestUsedFor: 'Automoción (norma MISRA C), aeroespacial, dispositivos médicos y firmware de producción.',
    sampleCode: `// C Embebido Bare-Metal: Acceso a Registros por Punteros Volátiles
#define PORTB_DIR (*((volatile uint8_t*) 0x24)) // Registro DDRB
#define PORTB_DATA (*((volatile uint8_t*) 0x25)) // Registro PORTB

void init_gpio(void) {
    PORTB_DIR |= (1 << 5); // Pin PB5 configurado como Salida
}

void toggle_led(void) {
    PORTB_DATA ^= (1 << 5); // Conmutación lógica XOR atómica
}`,
    summary: 'El lenguaje más utilizado en la historia de los sistemas embebidos. Ofrece manipulación de bits y punteros a memoria directa con compiladores optimizadores maduros (GCC, Clang, IAR, Keil).',
    pros: ['Control absoluto del hardware y mapa de memoria', 'Compilación directa a código máquina sin intérprete', 'Estándar estricto en la industria'],
    cons: ['Gestión manual de punteros propensa a errores', 'Falta de abstracciones orientadas a objetos nativas']
  },
  {
    id: 'cpp_embedded',
    name: 'C++ Embebido & Arduino Framework',
    badge: 'Popular & Modular',
    level: 'Nivel Medio-Alto',
    efficiency: '95% - 99% de la velocidad nativa',
    footprint: 'Baja a Moderada (~1-4 KB base)',
    bestUsedFor: 'Prototipado rápido, bibliotecas modulares de sensores, robótica con ROS2 embebido (micro-ROS).',
    sampleCode: `// C++: Abstracción de Clases de Hardware y Métodos Seguros
class DigitalOutputPin {
private:
    uint8_t pinNumber;
public:
    DigitalOutputPin(uint8_t pin) : pinNumber(pin) {
        pinMode(pinNumber, OUTPUT);
    }
    void write(bool state) {
        digitalWrite(pinNumber, state ? HIGH : LOW);
    }
    void toggle() {
        digitalWrite(pinNumber, !digitalRead(pinNumber));
    }
};

DigitalOutputPin statusLed(13);`,
    summary: 'Aporta programación orientada a objetos (POO), plantillas (templates) y encapsulamiento limpio para periféricos, facilitando la creación de librerías reusables entre diferentes placas.',
    pros: ['Modularidad y reutilización limpia de componentes', 'Compatibilidad total con código en C', 'Fácil para equipos grandes'],
    cons: ['El uso descuidado de new/delete puede fragmentar la memoria SRAM']
  },
  {
    id: 'micropython',
    name: 'MicroPython & CircuitPython',
    badge: 'Prototipado Rápido',
    level: 'Alto Nivel Interpretado',
    efficiency: '10% - 25% frente a C nativo',
    footprint: 'Alta (~250 KB Flash, ~32 KB RAM)',
    bestUsedFor: 'Proyectos IoT conectados en ESP32 / RP2040, educación y demostraciones rápidas de conceptos.',
    sampleCode: `# MicroPython para ESP32
from machine import Pin
import time

# Instancia de periférico con sintaxis limpia
led = Pin(2, Pin.OUT)

def secuencia_alerta():
    for _ in range(5):
        led.on()
        time.sleep_ms(100)
        led.off()
        time.sleep_ms(100)`,
    summary: 'Una reescritura completa del intérprete de Python 3 optimizada para correr en el silicio con terminal interactiva en vivo (REPL) sin necesidad de compilar.',
    pros: ['Curva de aprendizaje inmediata', 'Depuración interactiva en tiempo real por puerto serie', 'Manejo simple de Wi-Fi y JSON'],
    cons: ['Mayor consumo de memoria y menor velocidad para control estricto de nanosegundos']
  },
  {
    id: 'assembly',
    name: 'Ensamblador (Assembly / ASM)',
    badge: 'Máximo Rendimiento',
    level: 'Bajo Nivel Puro',
    efficiency: '100% Rendimiento Teórico',
    footprint: 'Absolutamente mínima',
    bestUsedFor: 'Rutinas críticas de interrupción (ISR de nanosegundos), secuencias de bootloader y criptografía.',
    sampleCode: `; Ensamblador AVR para ATmega328P
.INCLUDE "m328pdef.inc"
.ORG 0x0000
    RJMP MAIN

MAIN:
    SBI   DDRB, 5       ; Pone a 1 el bit 5 de DDRB (Modo Salida)
LOOP:
    SBI   PORTB, 5      ; Enciende LED (Pin 13)
    RCALL RETARDO
    CBI   PORTB, 5      ; Apaga LED
    RCALL RETARDO
    RJMP  LOOP`,
    summary: 'Traducción directa de una instrucción en texto mnemónico a un opcode binario de CPU. Brinda control absoluto de cada ciclo de reloj del microcontrolador.',
    pros: ['Cero sobrecarga de compilador', 'Control exacto de tiempos y consumo de energía'],
    cons: ['Completamente dependiente del procesador (cero portabilidad)', 'Complejo de mantener y escalar']
  },
  {
    id: 'rust_embedded',
    name: 'Rust Embebido (#![no_std])',
    badge: 'La Nueva Frontera',
    level: 'Medio / Concurrencia Segura',
    efficiency: '98% - 100% de la velocidad nativa',
    footprint: 'Mínima (< 1 KB base)',
    bestUsedFor: 'Sistemas críticos donde los errores de memoria (buffer overflow) son inaceptables: satélites y automoción.',
    sampleCode: `// Rust Embebido sin biblioteca estándar (no_std)
#![no_std]
#![no_main]

use panic_halt as _;
use cortex_m_rt::entry;
use stm32f4xx_hal::{pac, prelude::*};

#[entry]
fn main() -> ! {
    let dp = pac::Peripherals::take().unwrap();
    let gpioc = dp.GPIOC.split();
    let mut led = gpioc.pc13.into_push_pull_output();

    loop {
        led.set_high(); // Tipo estricto verificado en tiempo de compilación
    }
}`,
    summary: 'Garantiza seguridad de memoria y ausencia de condiciones de carrera en concurrencia en tiempo de compilación mediante su sistema de propiedad (ownership), sin recolector de basura.',
    pros: ['Inmunidad a vulnerabilidades de memoria (sin desbordamientos de buffer)', 'Mismo rendimiento que C/C++'],
    cons: ['Curva de aprendizaje empinada para desarrolladores nuevos']
  }
];

export const LanguagesSection: React.FC = () => {
  const [selectedLangId, setSelectedLangId] = useState<string>('c_embedded');
  const [copied, setCopied] = useState<boolean>(false);

  const lang = LANGUAGES_DATA.find((l) => l.id === selectedLangId) || LANGUAGES_DATA[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lang.sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="lenguajes" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">
            <span>Sección 07</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Software y Herramientas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            7. Lenguajes de Programación y Toolchains
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            La programación de microcontroladores exige elegir el balance perfecto entre velocidad
            de ejecución, control directo del mapa de registros y velocidad de desarrollo de software.
          </p>
        </div>

        {/* Language selector segmented tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
          {LANGUAGES_DATA.map((item) => {
            const isSelected = item.id === selectedLangId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedLangId(item.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80 ring-1 ring-sky-400/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Selected Language Deep Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Code Viewer with Copy Button */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="font-mono text-slate-300 ml-2 font-semibold">{lang.name}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 sm:p-5 text-xs sm:text-[13px] font-mono leading-relaxed text-slate-200 overflow-x-auto bg-[#070B14]">
              <code>{lang.sampleCode}</code>
            </pre>
          </div>

          {/* Right: Technical Attributes & Trade-offs */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-sky-300">{lang.badge}</span>
              <span className="text-xs text-slate-400">{lang.level}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{lang.name}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {lang.summary}
            </p>

            {/* Metrics */}
            <div className="space-y-3 mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Eficiencia de Ejecución:</span>
                <span className="font-mono font-semibold text-emerald-300">{lang.efficiency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Huella de Memoria (Footprint):</span>
                <span className="font-mono font-semibold text-purple-300">{lang.footprint}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                <strong className="text-slate-400 block mb-0.5">Uso Recomendado:</strong>
                {lang.bestUsedFor}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Ventajas Principales
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lang.pros.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Puntos a Considerar
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lang.cons.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
