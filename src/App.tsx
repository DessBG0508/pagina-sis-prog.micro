import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroductionSection } from './components/IntroductionSection';
import { DefinitionSection } from './components/DefinitionSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ComponentsSection } from './components/ComponentsSection';
import { OperationSection } from './components/OperationSection';
import { FamiliesSection } from './components/FamiliesSection';
import { LanguagesSection } from './components/LanguagesSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { ProsConsSection } from './components/ProsConsSection';
import { SimulatorSection } from './components/SimulatorSection';
import { QuizSection } from './components/QuizSection';
import { BibliographySection } from './components/BibliographySection';
import { Footer } from './components/Footer';
import { GlossaryModal } from './components/GlossaryModal';

export default function App() {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  const handleOpenQuiz = () => {
    const quizElement = document.getElementById('evaluacion');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-pink-500/20 selection:text-pink-200">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenQuiz={handleOpenQuiz}
        />

        {/* 1. Introducción a los microcontroladores */}
        <IntroductionSection />

        {/* 2. Definición y características */}
        <DefinitionSection />

        {/* 3. Arquitectura interna */}
        <ArchitectureSection />

        {/* 4. Componentes principales */}
        <ComponentsSection />

        {/* 5. Funcionamiento y ciclo de instrucción */}
        <OperationSection />

        {/* 6. Tipos y familias de microcontroladores */}
        <FamiliesSection />

        {/* 7. Lenguajes de programación y toolchains */}
        <LanguagesSection />

        {/* 8. Aplicaciones en la vida moderna */}
        <ApplicationsSection />

        {/* 9. Ventajas y desventajas */}
        <ProsConsSection />

        {/* 10. Ejemplos prácticos y simulador en tiempo real */}
        <SimulatorSection />

        {/* Autoevaluación interactiva */}
        <QuizSection />

        {/* Bibliografía y enlaces de consulta */}
        <BibliographySection />
      </main>

      {/* Footer */}
      <Footer
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Interactive Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
