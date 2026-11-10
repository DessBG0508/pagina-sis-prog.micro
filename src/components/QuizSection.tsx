import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/microcontrollerData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface QuizSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = () => {
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every((q) => userAnswers[q.id] !== undefined);

  return (
    <section id="evaluacion" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Autoevaluación de Aprendizaje</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cuestionario de Validación Técnica
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Pon a prueba tu comprensión sobre arquitecturas Harvard, conversión analógica,
            periféricos y el calificador de memoria <code>volatile</code>.
          </p>
        </div>

        {/* Questions list */}
        <div className="space-y-6 mb-8">
          {QUIZ_QUESTIONS.map((q, index) => {
            const selectedOption = userAnswers[q.id];
            const isCorrect = selectedOption === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    <span className="text-pink-300 mr-2 font-mono">0{index + 1}.</span>
                    {q.question}
                  </h3>
                  {submitted && (
                    <span className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (submitted) {
                      if (oIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-purple-950/50 border-purple-400/60 text-white ring-1 ring-purple-400/30';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isSelected && !submitted && (
                          <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback after submit */}
                {submitted && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-purple-300 block mb-1">Fundamento Teórico:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Score Banner */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {submitted ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-400">Puntaje Obtenido:</span>
                <h4 className="text-xl font-bold font-mono text-white">
                  {score} / {QUIZ_QUESTIONS.length} Correctas (
                  {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
                </h4>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-sm font-bold text-white">¿Listo para validar tus respuestas?</h4>
              <p className="text-xs text-slate-400">
                {allAnswered
                  ? 'Has respondido todas las preguntas.'
                  : `Has respondido ${Object.keys(userAnswers).length} de ${QUIZ_QUESTIONS.length} preguntas.`}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            {submitted ? (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar Quiz</span>
              </button>
            ) : (
              <button
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-pink-300 via-purple-300 to-sky-200 text-slate-950 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-pink-500/10"
              >
                <span>Calificar Respuestas</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
