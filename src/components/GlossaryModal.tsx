import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/microcontrollerData';
import { GlossaryTerm } from '../types/microcontroller';
import { X, Search, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', 'Arquitectura', 'Periféricos', 'Memoria', 'Programación'];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.acronym && term.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#090D16] border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-400/20 text-purple-300 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Glosario de Términos de Silicio</h3>
              <p className="text-xs text-slate-400">Conceptos y acrónimos esenciales de la microelectrónica</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar Glosario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar término (ej. ADC, GPIO, RISC, DMA, Watchdog)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-500/20 text-purple-200 border border-purple-400/40'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'Todos los términos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms list */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((t) => (
              <div
                key={t.term}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-pink-300">{t.term}</span>
                    {t.acronym && (
                      <span className="text-xs text-slate-400 font-medium">({t.acronym})</span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{t.definition}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No se encontraron términos que coincidan con &quot;{searchTerm}&quot;.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Presiona la tecla Esc o el botón cerrar para regresar a la página principal.
        </div>
      </div>
    </div>
  );
};
