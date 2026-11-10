import React from 'react';
import { ACADEMIC_REFERENCES } from '../data/microcontrollerData';
import { BookMarked, ExternalLink, FileText, Book, Award } from 'lucide-react';

export const BibliographySection: React.FC = () => {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Libro':
        return 'text-pink-300 border-pink-400/40 bg-pink-950/40';
      case 'Datasheet':
        return 'text-sky-300 border-sky-400/40 bg-sky-950/40';
      case 'Manual Técnico':
        return 'text-purple-300 border-purple-400/40 bg-purple-950/40';
      case 'Artículo IEEE':
        return 'text-emerald-300 border-emerald-400/40 bg-emerald-950/40';
      default:
        return 'text-slate-300 border-slate-700 bg-slate-900';
    }
  };

  return (
    <section id="bibliografia" className="py-16 sm:py-20 border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">
            <span>Fuentes Académicas</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Rigor y Verificación</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Bibliografía y Documentación Oficial
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Referencias verificadas de literatura académica, manuales de silicio de fabricantes
            y publicaciones de ingeniería electrónica para consulta y profundización.
          </p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_REFERENCES.map((ref, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getTypeBadgeColor(
                      ref.type
                    )}`}
                  >
                    {ref.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{ref.year}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {ref.title}
                </h3>

                <p className="text-xs font-medium text-purple-300 mb-3">
                  {ref.authors}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {ref.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate max-w-[200px]">{ref.publisher}</span>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-pink-300 hover:text-pink-200 transition-colors font-medium shrink-0"
                >
                  <span>Consultar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
