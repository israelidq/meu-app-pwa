'use client';

import React from 'react';
import { Habito } from '@/types/habito';
import { foiConfirmadoHoje } from '@/utils/habitoUtils';

interface CardHabitoProps {
  habito: Habito;
  onConfirmar: (id: string) => void;
  onSelecionar: (habito: Habito) => void;
}

export const CardHabito: React.FC<CardHabitoProps> = ({
  habito,
  onConfirmar,
  onSelecionar,
}) => {
  const concluidoHoje = foiConfirmadoHoje(habito);

  return (
    <div
      onClick={() => onSelecionar(habito)}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all active:scale-[0.98] cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
          {habito.titulo}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="text-orange-500">🔥</span>
          <span>
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              {habito.diasSeguidos}
            </strong>{' '}
            {habito.diasSeguidos === 1 ? 'dia seguido' : 'dias seguidos'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // impede que o clique no botão também abra o modal
          onConfirmar(habito.id);
        }}
        disabled={concluidoHoje}
        className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95 select-none ${
          concluidoHoje
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 cursor-default'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
        }`}
      >
        {concluidoHoje ? 'Concluído ✓' : '+1 Hoje'}
      </button>
    </div>
  );
};