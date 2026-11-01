'use client';

import React, { useState } from 'react';
import { Habito } from '@/types/habito';
import { SeletorDiasLivres } from './SeletorDiasLivres';

interface ModalEditarDiasLivresProps {
  habito: Habito | null;
  onClose: () => void;
  onSalvar: (id: string, diasLivres: number[]) => void;
}

// Componente interno: só é montado quando existe um hábito selecionado (ver export
// abaixo), e recebe uma `key` baseada no id do hábito. Isso garante que, ao trocar de
// hábito, o React remonta este componente do zero em vez de reaproveitar o estado
// antigo — dispensando um useEffect para sincronizar `diasLivres` com a prop.
const FormularioEdicao: React.FC<{
  habito: Habito;
  onClose: () => void;
  onSalvar: (id: string, diasLivres: number[]) => void;
}> = ({ habito, onClose, onSalvar }) => {
  const [diasLivres, setDiasLivres] = useState<number[]>(habito.diasLivres);

  const handleSalvar = () => {
    onSalvar(habito.id, diasLivres);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Dias livres
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Marque os dias da semana em que não confirmar &quot;{habito.titulo}&quot;
          não quebra a sua sequência.
        </p>

        <SeletorDiasLivres diasLivres={diasLivres} onChange={setDiasLivres} />

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl font-medium text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSalvar}
            className="px-5 py-2.5 rounded-xl font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalEditarDiasLivres: React.FC<ModalEditarDiasLivresProps> = ({
  habito,
  onClose,
  onSalvar,
}) => {
  if (!habito) return null;

  return (
    <FormularioEdicao
      key={habito.id}
      habito={habito}
      onClose={onClose}
      onSalvar={onSalvar}
    />
  );
};