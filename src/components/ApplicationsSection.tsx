import React from 'react';
import { Car, HeartPulse, Wifi, Bot, Rocket, Factory, ArrowUpRight } from 'lucide-react';

interface ApplicationItem {
  icon: React.ReactNode;
  sector: string;
  headline: string;
  description: string;
  technicalRole: string;
  realWorldExample: string;
  accent: 'rose' | 'lilac' | 'cyan' | 'mint';
}

const APPLICATIONS: ApplicationItem[] = [
  {
    icon: <Car className="w-5 h-5" />,
    sector: 'Automoción y Vehículos Eléctricos',
    headline: 'Seguridad Activa y Gestión de Baterías',
    description: 'Los automóviles modernos integran entre 80 y 150 microcontroladores interconectados por bus CAN y LIN.',
    technicalRole: 'Muestreo de sensores de rueda a 1 kHz en ABS, control de microinversores de tracción y supervisión celda a celda en BMS.',
    realWorldExample: 'Sistemas ESP/ABS de Bosch con microcontroladores Infineon TriCore y NXP S32K.',
    accent: 'rose'
  },
  {
    icon: <HeartPulse className="w-5 h-5" />,
    sector: 'Dispositivos Médicos y Wearables',
    headline: 'Soporte Vital y Monitorización Continua',
    description: 'Aparatos biomédicos donde el consumo ultra-bajo y la tolerancia cero a fallos salvan vidas humanas.',
    technicalRole: 'Detección de arritmias cardíacas en marcapasos con corrientes menores a 1 µA; control de micropompas de insulina con bucle cerrado.',
    realWorldExample: 'Marcapasos Medtronic, bombas de infusión continuas y oxímetros de pulso basados en TI MSP430 y ARM Cortex-M0+.',
    accent: 'lilac'
  },
  {
    icon: <Wifi className="w-5 h-5" />,
    sector: 'Internet de las Cosas (IoT) y Domótica',
    headline: 'Hogares Conectados y Edificios Inteligentes',
    description: 'Dispositivos de borde (Edge computing) que recolectan variables físicas y se comunican a la nube con bajo consumo.',
    technicalRole: 'Cifrado TLS por hardware, conexión Wi-Fi/BLE, lectura de sensores ambientales y conmutación de cargas de potencia.',
    realWorldExample: 'Termostatos inteligentes Nest, cerraduras biométricas Matter y enchufes inteligentes basados en Espressif ESP32.',
    accent: 'cyan'
  },
  {
    icon: <Bot className="w-5 h-5" />,
    sector: 'Robótica y Drones Autónomos',
    headline: 'Cinemática Inversa y Control de Vuelo PID',
    description: 'Estabilización de vehículos aéreos y coordinación de servomotores en tiempo real milimétrico.',
    technicalRole: 'Fusión sensorial con filtros de Kalman entre giroscopios y acelerómetros (IMU) a 8 kHz con salidas DShot/PWM para motores brushless.',
    realWorldExample: 'Controladores de vuelo Betaflight y PX4 Autopilot montados sobre microcontroladores STM32F7 y STM32H7.',
    accent: 'mint'
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    sector: 'Aeroespacial y CubeSats',
    headline: 'Satélites Pequeños y Exploración Científica',
    description: 'Misiones espaciales de órbita baja (LEO) donde el peso y la resiliencia al flujo de radiación son críticos.',
    technicalRole: 'Supervisión de paneles solares, telemetría y telecomandos (TM/TC) con memorias tolerantes a Single-Event Upsets (SEU).',
    realWorldExample: 'Nanocargas CubeSat de universidades globales impulsadas por microcontroladores radiation-tolerant SAMV71 de Microchip.',
    accent: 'rose'
  },
  {
    icon: <Factory className="w-5 h-5" />,
    sector: 'Industria 4.0 y Mantenimiento Predictivo',
    headline: 'Automatización y Monitoreo de Maquinaria',
    description: 'Supervisión de vibraciones y calor en motores industriales para predecir fallas antes de que ocurran.',
    technicalRole: 'Análisis de transformada rápida de Fourier (FFT) en el nodo con DSP y transmisión mediante protocolos Modbus/RS-485.',
    realWorldExample: 'Micro-PLCs industriales, variadores de frecuencia y sensores IO-Link de Siemens y Schneider Electric.',
    accent: 'lilac'
  }
];

export const ApplicationsSection: React.FC = () => {
  return (
    <section id="aplicaciones" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            <span>Sección 08</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Impacto en el Mundo Real</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            8. Aplicaciones de los Microcontroladores
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Invisibles pero omnipresentes. Los microcontroladores constituyen la médula espinal de
            la automatización moderna, interactuando físicamente en milisegundos con nuestro entorno cotidiano.
          </p>
        </div>

        {/* Featured Image & Case Study Banner */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 mb-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 relative">
              <img
                src="/src/assets/images/embedded_applications_1793980256490.jpg"
                alt="Banco de trabajo de ingeniería electrónica con brazo robótico, monitor médico y nodos IoT"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070B14]/80 hidden lg:block" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center">
              <div className="text-xs font-mono font-bold text-pink-300 uppercase mb-2">
                Laboratorio de Integración Física
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Convergencia de Hardware y Software
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                En el banco de trabajo se materializa la programación embebida: la orquestación simultánea
                de servomotores con PWM, la monitorización continua de señales de electrocardiograma (ECG)
                y la transmisión inalámbrica de telemetría vía Wi-Fi y Bluetooth BLE.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                <span className="text-emerald-300 font-semibold block mb-0.5">Dato Global de Mercado:</span>
                El 98% de todos los microprocesadores producidos a nivel mundial son microcontroladores embebidos, no CPUs de computadoras de escritorio.
              </div>
            </div>
          </div>
        </div>

        {/* 6 Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLICATIONS.map((app, index) => {
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {app.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">Sector</span>
                      <h4 className="text-xs font-bold text-white">{app.sector}</h4>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 mb-2">{app.headline}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{app.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Rol del Microcontrolador:</span>
                    <span className="text-slate-300 font-medium">{app.technicalRole}</span>
                  </div>
                  <div className="text-[11px] text-purple-300">
                    <strong className="text-slate-400">Ejemplo en la industria: </strong>
                    {app.realWorldExample}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
