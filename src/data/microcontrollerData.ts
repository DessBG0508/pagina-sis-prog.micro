import {
  TimelineItem,
  McuMpuComparison,
  InternalBlock,
  ComponentItem,
  McuFamily,
  CodeExample,
  QuizQuestion,
  GlossaryTerm,
  AcademicReference
} from '../types/microcontroller';

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '1971',
    title: 'Intel 4004',
    milestone: 'Primer Microprocesador Comercial',
    description: 'Diseñado por Federico Faggin y Marcian Hoff. 4 bits, 2300 transistores. Marcó el inicio de la computación integrada en silicio.'
  },
  {
    year: '1976',
    title: 'Intel 8048 (MCS-48)',
    milestone: 'El Nacimiento del Microcontrolador',
    description: 'Primer circuito integrado que combinó CPU, memoria ROM, RAM y puertos I/O en un único encapsulado. Utilizado en el teclado del IBM PC original.'
  },
  {
    year: '1980',
    title: 'Intel 8051 (MCS-51)',
    milestone: 'El Estándar Industrial Duradero',
    description: 'Arquitectura Harvard con espacios de memoria de programa y datos separados. Estableció las bases de los microcontroladores embebidos que aún se usan hoy en día.'
  },
  {
    year: '1993',
    title: 'Microchip PIC16C84',
    milestone: 'Revolución de la Memoria EEPROM',
    description: 'Primer microcontrolador con memoria de programa reescribible eléctricamente (EEPROM), eliminando la necesidad de ventanas UV para reprogramación.'
  },
  {
    year: '1996',
    title: 'Atmel AVR (AT90S / ATmega)',
    milestone: 'Optimizado para Lenguaje C y Memoria Flash',
    description: 'Arquitectura RISC modificada de ciclo único. Posteriormente se convirtió en el cerebro de la plataforma abierta Arduino Uno (ATmega328P).'
  },
  {
    year: '2004',
    title: 'ARM Cortex-M Series',
    milestone: 'La Hegemonía de los 32 Bits',
    description: 'ARM introduce el Cortex-M3 (y luego M0, M4 con FPU, M7). Estandarizó la arquitectura de 32 bits de alto rendimiento y ultra-bajo consumo en la industria global.'
  },
  {
    year: '2016-Presente',
    title: 'ESP32 & RP2040 / RISC-V',
    milestone: 'Era de la Conectividad IoT y Open Silicon',
    description: 'Integración masiva de Wi-Fi/Bluetooth de bajo coste (Espressif ESP32), periféricos programables PIO (Raspberry Pi RP2040) y el surgimiento del silicio abierto RISC-V.'
  }
];

export const MCU_MPU_COMPARISONS: McuMpuComparison[] = [
  {
    feature: 'Integración de Hardware',
    mcu: 'Todo en un solo chip: CPU, Flash, SRAM, oscilador y periféricos (GPIO, ADC, UART, PWM).',
    mpu: 'Solo la CPU principal en el chip. Requiere chips externos de RAM (DDR), almacenamiento (eMMC/SSD) y PMIC.',
    description: 'Los MCUs son autónomos y compactos; los MPUs requieren una placa de circuito impreso compleja multicapa.'
  },
  {
    feature: 'Determinismo y Tiempo Real',
    mcu: 'Determinista y estricto (Hard Real-Time). Las interrupciones responden en microsegundos o nanosegundos.',
    mpu: 'No determinista por defecto. Ejecuta sistemas operativos complejos (Linux, Windows) con latencias de planificación variables.',
    description: 'Crucial para control de motores, sistemas automotrices (airbags) e instrumental médico donde un retraso es crítico.'
  },
  {
    feature: 'Consumo de Energía',
    mcu: 'Microvatios a milivatios (µW - mW). Modos de suspensión profunda de hasta 100 nA. Funciona meses con pilas de botón.',
    mpu: 'Varios vatios (1W a más de 100W). Requiere disipadores térmicos, ventiladores y fuentes de alimentación robustas.',
    description: 'Los MCUs dominan dispositivos portátiles, wearables, sensores remotos de campo y nodos IoT.'
  },
  {
    feature: 'Capacidad de Cómputo y RAM',
    mcu: 'Frecuencias de 8 MHz a 600 MHz. Memoria RAM de 2 KB a 2 MB. Memoria Flash de 16 KB a 4 MB.',
    mpu: 'Frecuencias de 1 GHz a 4+ GHz con múltiples núcleos. Memoria RAM de 512 MB a 128 GB.',
    description: 'Los MCUs están diseñados para tareas de control específicas; los MPUs para computación masiva e interfaces gráficas complejas.'
  },
  {
    feature: 'Costo Unitario y Diseño PCB',
    mcu: 'Bajo ($0.20 a $8.00 USD). Diseñable en PCB de 2 capas sin impedancia controlada compleja.',
    mpu: 'Medio a Alto ($10 a $300+ USD). Requiere PCBs de 4 a 12 capas con trazas de alta velocidad e impedancia controlada.',
    description: 'Ideal para producción masiva de electrónica de consumo y electrodomésticos.'
  }
];

export const ARCHITECTURE_BLOCKS: InternalBlock[] = [
  {
    id: 'cpu_core',
    name: 'Núcleo de CPU / Unidad de Control',
    category: 'core',
    summary: 'El motor computacional que ejecuta instrucciones y orquesta el flujo de datos.',
    details: 'Contiene el Contador de Programa (PC), el Registro de Instrucción (IR) y la lógica de decodificación. Coordina las fases del ciclo de reloj leyendo instrucciones de la memoria Flash y secuenciando las microoperaciones hacia la ALU y registros.',
    technicalSpecs: ['Arquitectura: Harvard / RISC', 'Pipeline: 2 a 3 etapas (Fetch, Decode, Execute)', 'Frecuencia típica: 16 MHz a 480 MHz'],
    registers: ['PC (Program Counter)', 'SP (Stack Pointer)', 'LR (Link Register)', 'PSR (Program Status Register)'],
    color: '#F472B6' // Pastel Rose
  },
  {
    id: 'alu',
    name: 'Unidad Aritmética Lógica (ALU)',
    category: 'core',
    summary: 'Realiza cálculos aritméticos (suma, resta) y operaciones lógicas booleanas (AND, OR, XOR, shifts).',
    details: 'En microcontroladores de 32 bits modernos (como ARM Cortex-M4/M7), la ALU incluye instrucciones DSP (Procesamiento Digital de Señales) y en algunos casos una FPU (Unidad de Punto Flotante de precisión simple o doble) para acelerar operaciones matemáticas.',
    technicalSpecs: ['Ancho de palabra: 8, 16 o 32 bits', 'Tiempo de operación: 1 ciclo de reloj en RISC', 'Banderas de estado: Carry (C), Zero (Z), Overflow (V), Negative (N)'],
    registers: ['Accumulator (ACC)', 'Status Register (SREG/APSR)', 'General Purpose Registers (R0-R15)'],
    color: '#C084FC' // Pastel Lilac
  },
  {
    id: 'flash_mem',
    name: 'Memoria Flash (Memoria de Programa)',
    category: 'memory',
    summary: 'Almacena permanentemente el código binario compilado (firmware) y constantes.',
    details: 'Es una memoria no volátil que retiene su información al apagar el circuito. Los microcontroladores incorporan mecanismos de protección de lectura (Read-Out Protection) para evitar ingeniería inversa y soportan IAP (In-Application Programming) para actualizaciones OTA (Over-The-Air).',
    technicalSpecs: ['Capacidad: 16 KB a 2 MB', 'Tecnología: NOR Flash embebida', 'Ciclos de escritura: ~10,000 - 100,000 ciclos'],
    registers: ['FLASH_ACR (Access Control)', 'FLASH_KEYR (Key Register)', 'FLASH_SR (Status Register)'],
    color: '#38BDF8' // Pastel Cyan
  },
  {
    id: 'sram_mem',
    name: 'Memoria SRAM (Memoria de Datos)',
    category: 'memory',
    summary: 'Memoria volátil de acceso aleatorio ultra-rápido para variables, pila y montículo.',
    details: 'Almacena las variables globales en tiempo de ejecución, buffers de comunicación y el Stack (pila de llamadas que guarda direcciones de retorno de funciones e interrupciones). Al perder la alimentación, su contenido desaparece por completo.',
    technicalSpecs: ['Acceso: 0 ciclos de espera (Zero Wait-State)', 'Estructura: Células de 6 transistores (6T-SRAM)', 'Capacidad: 2 KB a 512 KB'],
    registers: ['SRAM_CTRL', 'STACK_TOP', 'STACK_LIMIT'],
    color: '#34D399' // Pastel Mint
  },
  {
    id: 'bus_matrix',
    name: 'Sistema de Buses (AHB / APB / Interconnect)',
    category: 'bus',
    summary: 'Autopistas de comunicación internas: Bus de Datos, Bus de Direcciones y Bus de Control.',
    details: 'En arquitecturas modernas basadas en ARM AMBA (Advanced Microcontroller Bus Architecture), se divide en AHB (Advanced High-performance Bus) para memorias y DMA de alta velocidad, y APB (Advanced Peripheral Bus) para periféricos de menor velocidad y bajo consumo.',
    technicalSpecs: ['Bus de Direcciones: Determina el mapa de memoria direccionable (ej. 32 bits = 4 GB)', 'Bus de Datos: Ancho del bus (32 bits transfieren 4 bytes por ciclo)', 'Arbitraje: Round-robin o prioridad fija'],
    registers: ['RCC (Reset & Clock Control)', 'DMA_CCR (DMA Channel Config)'],
    color: '#F472B6' // Pastel Rose
  },
  {
    id: 'peripherals',
    name: 'Periféricos Embebidos (GPIO, Timers, ADC, UART)',
    category: 'peripheral',
    summary: 'Módulos de hardware dedicados que interactúan con el mundo físico sin sobrecargar la CPU.',
    details: 'Permiten medir señales analógicas (ADC), conmutar relés o leer botones (GPIO), generar señales PWM para motores (Timers), y comunicarse con sensores externos a través de protocolos digitales (UART, SPI, I2C, CAN Bus).',
    technicalSpecs: ['GPIO: Modos Push-pull, Open-drain, Pull-up/down', 'ADC: 10/12 bits con tasa de muestreo de hasta 2.4 MSPS', 'Timers: 16/32 bits con captura y comparación (PWM)'],
    registers: ['GPIOx_MODER', 'GPIOx_ODR', 'TIMx_CCR1', 'ADC_CR2'],
    color: '#C084FC' // Pastel Lilac
  }
];

export const COMPONENTS_DATA: ComponentItem[] = [
  {
    id: 'cpu',
    title: 'Unidad Central de Procesamiento',
    acronym: 'CPU & ALU',
    subtitle: 'El cerebro de procesamiento aritmético y secuenciación',
    description: 'Ejecuta las instrucciones del programa almacenadas en memoria Flash. Lee los datos, efectúa operaciones matemáticas y lógicas en la ALU, y toma decisiones mediante saltos condicionales y banderas de estado (Zero, Carry, Overflow).',
    keyFunctions: [
      'Búsqueda, decodificación y ejecución de código máquina',
      'Manejo del puntero de programa (PC) y registros de trabajo',
      'Gestión de modos de ahorro de energía (Sleep, Deep-Sleep, Standby)',
      'Ejecución atómica de instrucciones aritméticas y lógicas'
    ],
    typicalParameters: '8 bits (AVR/PIC) hasta 32 bits (Cortex-M4/M7 a 480MHz)',
    accentColor: 'rose'
  },
  {
    id: 'flash_sram',
    title: 'Memorias Integradas (Flash, SRAM y EEPROM)',
    acronym: 'MEMORIA',
    subtitle: 'Almacenamiento no volátil de firmware y volátil de variables',
    description: 'La memoria Flash almacena el código que no se borra al desconectar la energía. La SRAM almacena variables dinámicas y la pila (stack) de ejecución. La EEPROM interna permite guardar configuraciones persistentes (como calibraciones o claves de red).',
    keyFunctions: [
      'Flash: Almacenamiento seguro de firmware ejecutable',
      'SRAM: Variables temporales de alta velocidad sin estados de espera',
      'EEPROM: Retención de datos de calibración byte a byte',
      'Controlador de memoria con protección contra copia y bloqueo de lectura'
    ],
    typicalParameters: 'Flash: 16 KB - 4 MB | SRAM: 2 KB - 512 KB | EEPROM: 512 B - 8 KB',
    accentColor: 'lilac'
  },
  {
    id: 'gpio',
    title: 'Puertos de Entrada/Salida de Propósito General',
    acronym: 'GPIO',
    subtitle: 'La interfaz física con interruptores, LEDs y transistores',
    description: 'Pines configurables mediante software como entradas (lectura digital de niveles altos y bajos) o salidas (control de actuadores). Poseen resistencias internas configurables de pull-up y pull-down, y circuitos de protección electrostática (ESD).',
    keyFunctions: [
      'Configuración individual por pin: Entrada, Salida, Analógico o Función Alterna',
      'Configuración de velocidad de conmutación (Slew Rate)',
      'Capacidad de drenar y suministrar corriente (típicamente 5mA a 20mA por pin)',
      'Detección de flancos de subida y bajada para disparar interrupciones'
    ],
    typicalParameters: 'Tensiones lógicas: 3.3V (estándar moderno) o 5V (robusto industrial)',
    accentColor: 'cyan'
  },
  {
    id: 'timers',
    title: 'Temporizadores, Contadores y Salidas PWM',
    acronym: 'TIMERS / PWM',
    subtitle: 'Precisión temporal en hardware independiente del reloj de CPU',
    description: 'Contadores digitales alimentados por un prescaler que divide la frecuencia de reloj. Permiten generar bases de tiempo exactas en microsegundos, medir la duración de pulsos externos (Input Capture) y modular señales (PWM - Pulse Width Modulation).',
    keyFunctions: [
      'Generación de señales PWM para control de intensidad LED y servomotores',
      'Medición precisa de frecuencias externas y anchos de pulso',
      'Disparo periódico de interrupciones temporizadas (Tick de RTOS)',
      'Contadores tipo encoder en cuadratura para robótica móvil'
    ],
    typicalParameters: 'Resolución: 8, 16 o 32 bits | Frecuencias PWM de 1 Hz a más de 1 MHz',
    accentColor: 'mint'
  },
  {
    id: 'adc_dac',
    title: 'Convertidores Analógico-Digital y Digital-Analógico',
    acronym: 'ADC / DAC',
    subtitle: 'El puente entre magnitudes continuas del mundo real y números binarios',
    description: 'El ADC muestrea voltajes continuos (procedentes de sensores de temperatura, presión, luz) y los convierte en palabras binarias. El DAC realiza el proceso inverso, generando voltajes analógicos suaves para síntesis de audio o referencias de tensión.',
    keyFunctions: [
      'Muestreo sucesivo por aproximaciones sucesivas (SAR ADC)',
      'Multiplexor analógico multicanal interno',
      'Referencia de voltaje interna calibrada de precisión (Vref)',
      'Modo de escaneo continuo con transferencia directa por DMA'
    ],
    typicalParameters: 'Resolución: 10 bits (0-1023) a 16 bits (0-65535) | Tasas: 100 kSPS a 5 MSPS',
    accentColor: 'rose'
  },
  {
    id: 'comms',
    title: 'Interfaces de Comunicación Serial',
    acronym: 'UART / SPI / I2C',
    subtitle: 'Protocolos de intercambio de datos con sensores, displays y PCs',
    description: 'Hardware dedicado que empaqueta y desempaqueta bytes en secuencias de pulsos digitales. UART permite enlaces punto a punto asíncronos; SPI proporciona transferencias síncronas full-duplex de alta velocidad; I2C permite conectar decenas de sensores con solo 2 cables.',
    keyFunctions: [
      'UART/USART: Asíncrono, 2 líneas (TX/RX), velocidades de hasta 10 Mbps',
      'SPI: Síncrono Maestro/Esclavo, 4 líneas (MOSI, MISO, SCK, CS), hasta 50 MHz',
      'I2C: Síncrono direccionable por bus, 2 líneas (SDA, SCL), hasta 3.4 MHz (High Speed)',
      'CAN Bus / USB: Protocolos industriales y conectividad con computadoras'
    ],
    typicalParameters: 'Buffers FIFO de hardware, generación automática de paridad y CRC',
    accentColor: 'lilac'
  },
  {
    id: 'interrupts',
    title: 'Controlador de Interrupciones y Watchdog',
    acronym: 'NVIC / WDT',
    subtitle: 'Garantía de respuesta en tiempo real y robustez ante cuelgues',
    description: 'El controlador de interrupciones suspende momentáneamente el bucle principal cuando ocurre un evento urgente (flanco en un pin, fin de conversión ADC, byte serial recibido) para atenderlo de inmediato. El Watchdog reinicia el chip si el firmware queda bloqueado en un bucle infinito.',
    keyFunctions: [
      'Vector de interrupciones con prioridades asignables por software',
      'Mínima latencia de entrada y salida (Tail-chaining en ARM NVIC)',
      'Watchdog de ventana (WWDG) y Watchdog independiente (IWDG)',
      'Detección de caída de tensión (Brown-out Reset - BOR)'
    ],
    typicalParameters: 'Latencia de respuesta: menor a 12 ciclos de reloj en ARM Cortex-M',
    accentColor: 'cyan'
  },
  {
    id: 'clock',
    title: 'Sistema de Reloj y Osciladores (PLL)',
    acronym: 'CLOCK & PLL',
    subtitle: 'El pulso cardiaco que sincroniza cada transistor del silicio',
    description: 'Genera las ondas cuadradas que conmutan los transistores. Combina osciladores internos tipo RC para arranque rápido y bajo consumo con osciladores de cristal de cuarzo externos de alta precisión (32.768 kHz para RTC y 8-25 MHz para CPU). El PLL multiplica la frecuencia.',
    keyFunctions: [
      'Oscilador RC interno de bajo consumo para despertar instantáneo',
      'Entrada para cristal de cuarzo externo (HSE) de alta estabilidad térmica',
      'Bucle de enganche de fase (PLL) multiplicador de frecuencia interna',
      'Reloj de tiempo real dedicado (RTC) alimentado por batería de respaldo (VBAT)'
    ],
    typicalParameters: 'Tolerancia de cuarzo: ±20 ppm | PLL multiplicador: hasta 480 MHz',
    accentColor: 'mint'
  }
];

export const FAMILIES_DATA: McuFamily[] = [
  {
    name: 'Microchip AVR (ATmega / ATtiny)',
    bits: '8-bit',
    manufacturer: 'Microchip (originalmente Atmel)',
    architecture: 'Harvard RISC modificada (32 registros generales)',
    clockSpeed: '8 - 20 MHz',
    flashRange: '2 KB - 256 KB',
    ramRange: '128 B - 8 KB',
    keyFeatures: 'Extremadamente fácil de aprender, tolerante a 5V, amplia documentación, base del ecosistema Arduino Uno.',
    bestFor: 'Educación, proyectos escolares, prototipado rápido, domótica básica.',
    exampleChips: ['ATmega328P', 'ATtiny85', 'ATmega2560']
  },
  {
    name: 'Microchip PIC (PIC16 / PIC18)',
    bits: '8-bit',
    manufacturer: 'Microchip Technology',
    architecture: 'Harvard RISC (Registro W único / Acumulador)',
    clockSpeed: '4 - 64 MHz',
    flashRange: '1 KB - 128 KB',
    ramRange: '64 B - 4 KB',
    keyFeatures: 'Legendaria robustez contra ruido electromagnético (EMC/EMI), coste ultra-bajo en producción masiva.',
    bestFor: 'Electrodomésticos, fuentes conmutadas, controles automotrices industriales simples.',
    exampleChips: ['PIC16F877A', 'PIC18F4550', 'PIC12F683']
  },
  {
    name: 'Texas Instruments MSP430',
    bits: '16-bit',
    manufacturer: 'Texas Instruments',
    architecture: 'Von Neumann RISC ortogonal de 16 bits',
    clockSpeed: '8 - 25 MHz',
    flashRange: '4 KB - 512 KB',
    ramRange: '512 B - 66 KB',
    keyFeatures: 'Líder histórico en consumo ultra-bajo de energía (modo standby < 0.5 µA, periféricos inteligentes eUSCI).',
    bestFor: 'Medidores de agua y gas (smart metering), instrumental portátil con batería para 10+ años.',
    exampleChips: ['MSP430G2553', 'MSP430FR5994 (FRAM)']
  },
  {
    name: 'STMicroelectronics STM32 (ARM Cortex-M)',
    bits: '32-bit',
    manufacturer: 'STMicroelectronics',
    architecture: 'ARMv7-M / ARMv8-M (Cortex-M0+, M4 con FPU, M7)',
    clockSpeed: '48 MHz - 550 MHz',
    flashRange: '32 KB - 2 MB',
    ramRange: '8 KB - 1 MB',
    keyFeatures: 'El estándar de la industria profesional: DMA multicanal, periféricos avanzados, FPU de hardware, compatibilidad CMSIS.',
    bestFor: 'Robótica avanzada, drones, control de motores industriales, audio digital, dispositivos médicos.',
    exampleChips: ['STM32F401RE', 'STM32F103C8T6 (Blue Pill)', 'STM32H743']
  },
  {
    name: 'Espressif ESP32 Series',
    bits: '32-bit',
    manufacturer: 'Espressif Systems',
    architecture: 'Xtensa Dual-Core LX6 / LX7 y núcleos RISC-V',
    clockSpeed: '160 - 240 MHz',
    flashRange: '4 MB - 16 MB (SPI Flash)',
    ramRange: '320 KB - 520 KB (+ PSRAM)',
    keyFeatures: 'Wi-Fi 802.11 b/g/n + Bluetooth 5.0 (BLE) integrado en el silicio, criptografía por hardware, FreeRTOS preinstalado.',
    bestFor: 'Internet de las Cosas (IoT), servidores web embebidos, pasarelas domóticas, streaming de sensores a la nube.',
    exampleChips: ['ESP32-WROOM-32', 'ESP32-S3', 'ESP32-C3 (RISC-V)']
  },
  {
    name: 'Raspberry Pi RP2040 / RP2350',
    bits: '32-bit',
    manufacturer: 'Raspberry Pi Foundation',
    architecture: 'Dual-core ARM Cortex-M0+ / M33 + RISC-V Hazard3',
    clockSpeed: '133 - 150 MHz',
    flashRange: 'Hasta 16 MB externa',
    ramRange: '264 KB - 520 KB',
    keyFeatures: 'Bloques PIO (Entrada/Salida Programable) únicos que permiten sintetizar protocolos de hardware a medida sin gastar CPU.',
    bestFor: 'Emulación de consolas retro, generadores de señal VGA/DVI, automatización flexible y educación.',
    exampleChips: ['RP2040', 'RP2350']
  }
];

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'blink',
    title: '01. Conmutación Digital de Salida (Blink LED)',
    subtitle: 'El "Hola Mundo" del hardware: configuración de registros de dirección y nivel lógico',
    description: 'Aprende cómo el microcontrolador conmuta un pin GPIO entre 0V (GND) y el voltaje de alimentación (3.3V/5V) controlando el tiempo mediante bucles o temporizadores.',
    difficulty: 'Básico',
    hardware: 'Pin PB5 (Digital 13 en ATmega328P / Arduino Uno) con resistencia de 220Ω y LED.',
    languages: [
      {
        language: 'C Embebido Bare-Metal (AVR-GCC)',
        code: `// Acceso directo a registros de hardware en ATmega328P
#include <avr/io.h>
#define F_CPU 16000000UL // Reloj de 16 MHz
#include <util/delay.h>

int main(void) {
    // Configura el pin PB5 (bit 5 del puerto B) como SALIDA
    // Escribiendo '1' en DDRB5 (Data Direction Register B)
    DDRB |= (1 << DDB5);

    while (1) {
        // Enciende el LED poniendo en '1' el bit 5 de PORTB
        PORTB |= (1 << PORTB5);
        _delay_ms(500); // Retardo de 500 milisegundos

        // Apaga el LED poniendo en '0' el bit 5 de PORTB
        PORTB &= ~(1 << PORTB5);
        _delay_ms(500);

        // Alternativa de conmutación rápida (Toggle):
        // PINB |= (1 << PINB5);
    }
    return 0;
}`,
        explanation: [
          'DDRB (Data Direction Register B): Controla si cada pin del puerto es entrada (0) o salida (1).',
          'PORTB (Port B Data Register): Escribe el valor lógico (1 = Alto 5V, 0 = Bajo 0V) en los pines de salida.',
          'Operaciones a nivel de bit: (1 << DDB5) desplaza un 1 a la posición del bit 5 de forma eficiente en un ciclo de máquina.',
          'Máxima eficiencia: El código resultante pesa menos de 180 bytes en memoria Flash.'
        ]
      },
      {
        language: 'C++ Arduino Framework',
        code: `// Implementación con capa de abstracción HAL (Arduino)
const int ledPin = 13; // Pin digital conectado al LED

void setup() {
  // Configura el pin especificado como salida digital
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH); // Envía nivel alto (5V / 3.3V)
  delay(500);                 // Espera 500 ms (bloqueante)
  digitalWrite(ledPin, LOW);  // Envía nivel bajo (0V)
  delay(500);                 // Espera 500 ms
}`,
        explanation: [
          'setup(): Función de inicialización que se ejecuta una sola vez al encender o reiniciar el microcontrolador.',
          'loop(): Bucle infinito donde reside el algoritmo continuo.',
          'pinMode() y digitalWrite(): Funciones de alto nivel que internamente calculan qué registro y bit modificar, priorizando simplicidad sobre velocidad extrema.'
        ]
      },
      {
        language: 'MicroPython (ESP32 / RP2040)',
        code: `# Programación interpretada de microcontroladores con MicroPython
from machine import Pin
import time

# Crea un objeto Pin configurado como salida
led = Pin(2, Pin.OUT)

print("Iniciando parpadeo de LED...")

while True:
    led.value(1)       # Enciende el LED
    time.sleep_ms(500) # Espera 500 milisegundos
    led.value(0)       # Apaga el LED
    time.sleep_ms(500)
`,
        explanation: [
          'from machine import Pin: Módulo nativo en C que expone el hardware directamente a Python.',
          'Interpretación en vivo: No requiere compilador externo en la PC; el código se transfiere como archivo de texto y se ejecuta en la máquina virtual MicroPython interna.'
        ]
      }
    ]
  },
  {
    id: 'adc_pwm',
    title: '02. Lectura Analógica (ADC) y Modulación PWM',
    subtitle: 'Conversión de magnitudes analógicas continuas en señales digitales moduladas',
    description: 'Lee el voltaje de un potenciómetro o sensor analógico (0V a 5V) a través del Convertidor Analógico-Digital (ADC) y ajusta proporcionalmente el ciclo de trabajo de una señal PWM para regular la potencia de un actuador.',
    difficulty: 'Intermedio',
    hardware: 'Potenciómetro conectado al canal analógico A0, LED con salida PWM en Pin 9.',
    languages: [
      {
        language: 'C++ Arduino / Bare-Metal',
        code: `const int analogPin = A0; // Canal ADC (0 a 1023 con resolución de 10 bits)
const int pwmPin = 9;      // Pin de salida PWM con temporizador Timer1

void setup() {
  pinMode(pwmPin, OUTPUT);
  Serial.begin(9600); // Inicializa UART para telemetría
}

void loop() {
  // 1. Muestreo del ADC: convierte voltaje (0-5V) a entero (0-1023)
  int sensorValue = analogRead(analogPin);

  // 2. Mapeo: El ADC es de 10 bits (0-1023), el PWM es de 8 bits (0-255)
  int pwmOutput = map(sensorValue, 0, 1023, 0, 255);

  // 3. Generación de PWM en hardware
  analogWrite(pwmPin, pwmOutput);

  // 4. Cálculo de voltaje real en punto flotante
  float voltage = sensorValue * (5.0 / 1023.0);

  // Envía datos por el puerto serie
  Serial.print("ADC: "); Serial.print(sensorValue);
  Serial.print(" | Voltaje: "); Serial.print(voltage, 2);
  Serial.print("V | Ciclo PWM: "); Serial.print((pwmOutput * 100) / 255);
  Serial.println("%");

  delay(50); // Muestreo periódico a 20 Hz
}`,
        explanation: [
          'analogRead(): Dispara el convertidor SAR del microcontrolador y espera el fin de la conversión.',
          'analogWrite(): No genera un voltaje analógico real, sino un tren de pulsos cuadrados (PWM) cuyo promedio de encendido entrega la potencia deseada.',
          'Fórmula de voltaje: Voltaje = (Lectura_ADC × Vref) / (2^Resolución - 1).'
        ]
      },
      {
        language: 'Embedded C (STM32 HAL / CMSIS)',
        code: `/* Lectura de ADC por sondeo y modulación por Timer PWM en STM32 */
ADC_HandleTypeDef hadc1;
TIM_HandleTypeDef htim3;

void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc) {
    // Callback cuando la conversión finaliza (o lectura por sondeo):
}

int main(void) {
    HAL_Init();
    SystemClock_Config(); // Configura reloj a 72 MHz
    MX_ADC1_Init();
    MX_TIM3_Init();

    // Inicia canal PWM en hardware Timer 3 Canal 1
    HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);

    while (1) {
        HAL_ADC_Start(&hadc1);
        if (HAL_ADC_PollForConversion(&hadc1, 10) == HAL_OK) {
            uint32_t adc_val = HAL_ADC_GetValue(&hadc1); // 12 bits: 0 a 4095
            
            // Actualiza el registro de comparación del temporizador (CCR)
            __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, adc_val);
        }
        HAL_Delay(20);
    }
}`,
        explanation: [
          'Resolución de 12 bits: En STM32 el rango es de 0 a 4095, ofreciendo 4 veces más precisión que un ADC de 10 bits.',
          '__HAL_TIM_SET_COMPARE(): Modifica directamente el registro Capture/Compare Register (CCR) en un solo ciclo sin interrumpir el temporizador.'
        ]
      }
    ]
  },
  {
    id: 'uart_comms',
    title: '03. Comunicación Serial UART Bidireccional',
    subtitle: 'Intercambio de telemetría y recepción de comandos por interfaz serie asíncrona',
    description: 'Implementa un protocolo de comandos serie donde el microcontrolador recibe órdenes en texto plano (ej: "LED_ON", "TEMP", "RESET") y responde con el estado del sistema a través de UART.',
    difficulty: 'Intermedio',
    hardware: 'Pines TX y RX conectados a un convertidor USB-Serial (FTDI / CH340) a 9600 o 115200 baudios.',
    languages: [
      {
        language: 'C++ Arduino con Parser de Comandos',
        code: `String inputBuffer = "";
bool ledState = false;

void setup() {
  Serial.begin(9600); // Configura UART: 9600 bps, 8 bits de datos, sin paridad, 1 bit de parada (8N1)
  pinMode(13, OUTPUT);
  while (!Serial) { ; } // Espera conexión en placas USB nativas
  Serial.println("SISTEMA MCU INICIADO. Escribe 'HELP' para ver comandos.");
}

void loop() {
  // Verifica si hay bytes disponibles en el buffer FIFO de hardware
  while (Serial.available() > 0) {
    char inChar = (char)Serial.read();
    if (inChar == '\\n' || inChar == '\\r') {
      if (inputBuffer.length() > 0) {
        procesarComando(inputBuffer);
        inputBuffer = "";
      }
    } else {
      inputBuffer += inChar;
    }
  }
}

void procesarComando(String cmd) {
  cmd.trim(); // Elimina espacios en blanco
  cmd.toUpperCase(); // Convierte a mayúsculas

  if (cmd == "LED ON") {
    digitalWrite(13, HIGH);
    ledState = true;
    Serial.println("OK: LED Encendido");
  } else if (cmd == "LED OFF") {
    digitalWrite(13, LOW);
    ledState = false;
    Serial.println("OK: LED Apagado");
  } else if (cmd == "STATUS") {
    Serial.print("TELEMETRIA: LED=");
    Serial.print(ledState ? "ACTIVO" : "INACTIVO");
    Serial.print(" | Uptime=");
    Serial.print(millis() / 1000);
    Serial.println("s");
  } else if (cmd == "HELP") {
    Serial.println("COMANDOS DISPONIBLES: LED ON | LED OFF | STATUS | HELP");
  } else {
    Serial.print("ERROR: Comando desconocido -> ");
    Serial.println(cmd);
  }
}`,
        explanation: [
          'Formato de trama 8N1: 1 bit de start (nivel bajo), 8 bits de datos (LSB primero), 0 bits de paridad, 1 bit de stop (nivel alto).',
          'Serial.available(): Retorna la cantidad de bytes que esperan en el buffer circular de 64 bytes administrado por la interrupción de recepción UART.',
          'Procesamiento desacoplado: Evita bloqueos largos procesando el comando completo solo al recibir el salto de línea (\\n).'
        ]
      }
    ]
  },
  {
    id: 'interrupts_isr',
    title: '04. Interrupciones Externas de Hardware (ISR)',
    subtitle: 'Respuesta inmediata a eventos externos críticos sin desperdiciar ciclos en sondeo (polling)',
    description: 'En lugar de verificar repetidamente el estado de un botón en un bucle cerrado (polling), el microcontrolador duerme o ejecuta otras tareas y es despertado instantáneamente por un flanco eléctrico en el pin de interrupción.',
    difficulty: 'Avanzado',
    hardware: 'Pulsador en Pin 2 (INT0) con resistencia pull-up interna y filtro antirrebote.',
    languages: [
      {
        language: 'C++ con Rutina de Servicio (ISR)',
        code: `const byte interruptPin = 2; // Pin de INT0 en ATmega328P
// La palabra clave 'volatile' es OBLIGATORIA para variables modificadas en una ISR
volatile unsigned long eventCount = 0;
volatile bool triggerFlag = false;

// Rutina de Servicio de Interrupción (ISR)
// DEBE ser lo más breve y rápida posible: sin delays, sin Serial.print pesado
void IRAM_ATTR botonISR() {
  static unsigned long lastInterruptTime = 0;
  unsigned long currentTime = millis();

  // Filtro de software contra rebotes mecánicos (debounce de 200 ms)
  if (currentTime - lastInterruptTime > 200) {
    eventCount++;
    triggerFlag = true;
    lastInterruptTime = currentTime;
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(interruptPin, INPUT_PULLUP); // Activa resistencia pull-up interna

  // Vincula la interrupción: Pin, función ISR, y condición de disparo
  // FALLING: Dispara cuando el botón se presiona (pasa de 5V a 0V GND)
  attachInterrupt(digitalPinToInterrupt(interruptPin), botonISR, FALLING);

  Serial.println("Interrupcion de hardware configurada. Presione el pulsador.");
}

void loop() {
  // El bucle principal realiza tareas normales sin preocuparse por el botón
  if (triggerFlag) {
    // Apaga temporalmente interrupciones si se leen variables de más de 1 byte
    noInterrupts();
    unsigned long copiaEventos = eventCount;
    triggerFlag = false;
    interrupts();

    Serial.print("¡INTERRUPCION DETECTADA! Total eventos: ");
    Serial.println(copiaEventos);
  }

  // Simulación de tarea principal en curso
  delay(10);
}`,
        explanation: [
          'Calificador volatile: Indica al compilador que la variable puede cambiar en cualquier instante fuera del flujo normal del código, evitando que el optimizador la almacene en un registro de CPU estático.',
          'Vector de Interrupción: El microcontrolador guarda el Program Counter (PC) y registros en la pila (Stack), salta a la dirección fija de INT0, ejecuta la ISR y retorna con la instrucción RETI.',
          'Regla de oro de las ISR: Nunca utilices delays(), comunicaciones pesadas ni bucles largos dentro de una función de interrupción.'
        ]
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál es la diferencia fundamental entre una Arquitectura Harvard y una Arquitectura Von Neumann en un microcontrolador?',
    options: [
      'Harvard posee buses separados para memoria de programa (instrucciones) y memoria de datos, permitiendo accesos simultáneos.',
      'Von Neumann es siempre de 32 bits y Harvard es únicamente de 8 bits.',
      'Harvard almacena el programa en la memoria RAM y Von Neumann en la memoria Flash.',
      'En la arquitectura Harvard no existe la Unidad Aritmética Lógica (ALU).'
    ],
    correctIndex: 0,
    explanation: 'La arquitectura Harvard separa físicamente las líneas de bus de instrucciones y de datos, eliminando el cuello de botella de Von Neumann y permitiendo leer la siguiente instrucción mientras se ejecutan o transfieren datos.'
  },
  {
    id: 2,
    question: '¿Por qué debe declararse con el calificador "volatile" una variable que se modifica dentro de una Rutina de Servicio de Interrupción (ISR)?',
    options: [
      'Para que la variable se guarde en la memoria EEPROM y no se borre al apagar.',
      'Para evitar que el compilador optimice la lectura de la variable asumiendo que su valor nunca cambia en el bucle principal.',
      'Para duplicar la velocidad de cálculo matemático de la ALU.',
      'Para forzar a que la variable sea accesible únicamente por el temporizador Watchdog.'
    ],
    correctIndex: 1,
    explanation: 'El calificador volatile le advierte al optimizador del compilador que el valor de la variable puede cambiar en cualquier instante por hardware o por una interrupción asíncrona, obligándolo a leerla siempre directamente de la memoria RAM.'
  },
  {
    id: 3,
    question: 'Un Convertidor Analógico-Digital (ADC) de 10 bits alimentado con un voltaje de referencia Vref = 5.00V recibe una señal de entrada de 2.50V. ¿Qué valor digital binario/decimal entregará aproximadamente?',
    options: [
      '255',
      '512 (o 511)',
      '1023',
      '2048'
    ],
    correctIndex: 1,
    explanation: 'Con 10 bits de resolución existen 2^10 = 1024 pasos discretos (de 0 a 1023). Para 2.50V (exactamente la mitad de 5.00V), la conversión es (2.50 / 5.00) * 1023 ≈ 511.5 (aproximadamente 512).'
  },
  {
    id: 4,
    question: '¿Cuál es la función principal del temporizador Watchdog (WDT) en un sistema embebido crítico?',
    options: [
      'Acelerar la velocidad del cristal de cuarzo cuando el procesador está sobrecargado.',
      'Generar la señal PWM para mover motores paso a paso.',
      'Reiniciar automáticamente el microcontrolador si el software sufre un bloqueo o entra en un bucle infinito.',
      'Cifrar las claves de conexión Wi-Fi en el bus SPI.'
    ],
    correctIndex: 2,
    explanation: 'El Watchdog es un temporizador independiente que debe ser "alimentado" o reiniciado periódicamente por el software normal. Si el programa se congela por ruido eléctrico o un error lógico y no refresca el WDT a tiempo, este expira y fuerza un Reset de hardware.'
  },
  {
    id: 5,
    question: '¿Qué ventaja distintiva ofrece el protocolo de comunicación serial SPI en comparación con I2C?',
    options: [
      'SPI requiere únicamente 2 cables para conectar cientos de dispositivos.',
      'SPI es síncrono, full-duplex y alcanza tasas de transferencia mucho más altas (decenas de MHz frente a kHz de I2C).',
      'SPI permite comunicación inalámbrica sin cables.',
      'SPI asigna direcciones lógicas de 7 bits a cada periférico sin líneas de selección de chip (CS).'
    ],
    correctIndex: 1,
    explanation: 'SPI utiliza líneas separadas para transmisión y recepción (MOSI y MISO) sincronizadas con un reloj continuo (SCK), logrando transferencias full-duplex de 10 a 50+ Mbps, ideales para pantallas gráficas, memorias Flash y tarjetas SD.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'GPIO',
    acronym: 'General Purpose Input/Output',
    category: 'Periféricos',
    definition: 'Pines digitales programables de un circuito integrado que pueden conmutar entre estados lógicos alto/bajo o leer sensores discretos.'
  },
  {
    term: 'ADC',
    acronym: 'Analog-to-Digital Converter',
    category: 'Periféricos',
    definition: 'Módulo electrónico que cuantifica una señal de voltaje continuo en un código numérico binario proporcional a una referencia de voltaje.'
  },
  {
    term: 'PWM',
    acronym: 'Pulse Width Modulation',
    category: 'Periféricos',
    definition: 'Técnica de modulación que varía el ciclo de trabajo de una onda cuadrada para controlar la potencia promedio entregada a cargas como motores y LEDs.'
  },
  {
    term: 'ISR',
    acronym: 'Interrupt Service Routine',
    category: 'Programación',
    definition: 'Función especial de código ejecutada inmediatamente por la CPU en respuesta a un evento de interrupción de hardware o software.'
  },
  {
    term: 'RISC',
    acronym: 'Reduced Instruction Set Computer',
    category: 'Arquitectura',
    definition: 'Filosofía de diseño de procesadores con un conjunto de instrucciones simple y altamente optimizado que se ejecutan en un único ciclo de reloj.'
  },
  {
    term: 'DMA',
    acronym: 'Direct Memory Access',
    category: 'Arquitectura',
    definition: 'Controlador de hardware que transfiere bloques de datos directamente entre periféricos y la memoria SRAM sin involucrar a la CPU, liberando cómputo.'
  },
  {
    term: 'UART',
    acronym: 'Universal Asynchronous Receiver-Transmitter',
    category: 'Periféricos',
    definition: 'Protocolo de comunicación serial asíncrono que no requiere línea de reloj compartida, basándose en velocidades de baudios acordadas previamente.'
  },
  {
    term: 'SPI',
    acronym: 'Serial Peripheral Interface',
    category: 'Periféricos',
    definition: 'Bus síncrono de cuatro hilos (MOSI, MISO, SCK, CS) que permite transmisión de datos full-duplex de muy alta velocidad entre maestro y esclavos.'
  },
  {
    term: 'I2C',
    acronym: 'Inter-Integrated Circuit',
    category: 'Periféricos',
    definition: 'Bus serial síncrono direccionable de dos hilos (SDA y SCL) creado por Philips, con soporte para múltiples dispositivos maestros y esclavos.'
  },
  {
    term: 'Watchdog',
    acronym: 'WDT',
    category: 'Periféricos',
    definition: 'Temporizador de seguridad que provoca un reset automático del sistema si el firmware se bloquea y no reinicia el contador a tiempo.'
  },
  {
    term: 'EEPROM',
    acronym: 'Electrically Erasable Programmable Read-Only Memory',
    category: 'Memoria',
    definition: 'Memoria no volátil que permite borrar y reescribir datos byte por byte millones de veces, ideal para almacenar configuraciones persistentes.'
  },
  {
    term: 'PLL',
    acronym: 'Phase-Locked Loop',
    category: 'Arquitectura',
    definition: 'Circuito multiplicador de frecuencia que eleva la señal de un oscilador de cristal de baja frecuencia a las altas velocidades del núcleo de la CPU.'
  }
];

export const ACADEMIC_REFERENCES: AcademicReference[] = [
  {
    type: 'Libro',
    authors: 'Muhammad Ali Mazidi, Janice Gillispie Mazidi, Rolin D. McKinlay',
    title: 'The 8051 Microcontroller and Embedded Systems: Using Assembly and C',
    publisher: 'Pearson Education / Prentice Hall',
    year: '2008 (2nd Edition)',
    url: 'https://www.pearson.com/',
    description: 'Texto fundamental de referencia universitaria sobre arquitectura Harvard, registros internos, temporizadores e interfaces en lenguaje C y ensamblador.'
  },
  {
    type: 'Libro',
    authors: 'Elecia White',
    title: 'Making Embedded Systems: Design Patterns for Great Software',
    publisher: "O'Reilly Media",
    year: '2011',
    url: 'https://www.oreilly.com/library/view/making-embedded-systems/9781449302146/',
    description: 'Guía de patrones de diseño para sistemas embebidos, gestión de interrupciones, máquinas de estados finitos y optimización de memoria RAM y Flash.'
  },
  {
    type: 'Datasheet',
    authors: 'Microchip Technology Inc.',
    title: 'ATmega328P 8-bit AVR Microcontroller with 32K Bytes In-System Programmable Flash',
    publisher: 'Microchip Document DS40002061B',
    year: '2018',
    url: 'https://www.microchip.com/en-us/product/ATmega328P',
    description: 'Hoja de datos oficial del circuito integrado ATmega328P: registros DDR/PORT/PIN, diagrama de bloques del núcleo AVR, temporizadores y módulo ADC de 10 bits.'
  },
  {
    type: 'Manual Técnico',
    authors: 'STMicroelectronics',
    title: 'RM0090 Reference Manual: STM32F405/415, STM32F407/417, STM32F427/437 and STM32F429/439 advanced Arm-based 32-bit MCUs',
    publisher: 'STMicroelectronics DocID018909 Rev 15',
    year: '2021',
    url: 'https://www.st.com/resource/en/reference_manual/dm00031020.pdf',
    description: 'Manual de referencia exhaustivo que describe la matriz de buses AHB/APB, el núcleo ARM Cortex-M4 con FPU, el controlador de interrupciones vectorizadas NVIC y los módulos DMA.'
  },
  {
    type: 'Manual Técnico',
    authors: 'Espressif Systems',
    title: 'ESP32 Technical Reference Manual (Detailed Hardware Architecture)',
    publisher: 'Espressif Systems V4.9',
    year: '2023',
    url: 'https://www.espressif.com/en/support/documents/technical-documents',
    description: 'Documentación técnica de la arquitectura Xtensa dual-core de 32 bits, subsistema de radiofrecuencia Wi-Fi/Bluetooth, aceleradores criptográficos y gestión de energía en Deep Sleep.'
  },
  {
    type: 'Artículo IEEE',
    authors: 'Joseph Yiu (ARM Senior Principal Engineer)',
    title: 'The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors',
    publisher: 'Newnes / Elsevier & IEEE Xplore',
    year: '2013 (3rd Edition)',
    url: 'https://ieeexplore.ieee.org/',
    description: 'Monografía autorizada sobre el modelo de programación de 32 bits, instrucciones Thumb-2, manejo de fallos y diseño de sistemas deterministas en tiempo real.'
  }
];
