export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  milestone: string;
}

export interface McuMpuComparison {
  feature: string;
  mcu: string;
  mpu: string;
  description: string;
}

export interface InternalBlock {
  id: string;
  name: string;
  category: 'core' | 'memory' | 'peripheral' | 'bus';
  summary: string;
  details: string;
  technicalSpecs: string[];
  registers: string[];
  color: string;
}

export interface ComponentItem {
  id: string;
  title: string;
  acronym: string;
  subtitle: string;
  description: string;
  keyFunctions: string[];
  typicalParameters: string;
  accentColor: 'rose' | 'lilac' | 'cyan' | 'mint';
}

export interface McuFamily {
  name: string;
  bits: '8-bit' | '16-bit' | '32-bit';
  manufacturer: string;
  architecture: string;
  clockSpeed: string;
  flashRange: string;
  ramRange: string;
  keyFeatures: string;
  bestFor: string;
  exampleChips: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  hardware: string;
  languages: {
    language: string;
    code: string;
    explanation: string[];
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  definition: string;
  category: 'Arquitectura' | 'Periféricos' | 'Memoria' | 'Programación';
}

export interface AcademicReference {
  type: 'Libro' | 'Datasheet' | 'Artículo IEEE' | 'Manual Técnico';
  authors: string;
  title: string;
  publisher: string;
  year: string;
  url: string;
  description: string;
}
