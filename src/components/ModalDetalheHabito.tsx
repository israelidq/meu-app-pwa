'use client';

import React, { useState } from 'react';
import { Habito } from '@/types/habito';
import { obterEstatisticasHabito } from '@/utils/habitoUtils';

interface ModalDetalheHabitoProps {
  habito: Habito | null;
  onClose: () => void;
  onExcluir: (id: string) => void;
  onEditarDiasLivres: (habito: Habito) => void;
} 

export const ModalDetalheHabito: React.FC<ModalDetalheHabitoProps> = ({
  habito,
  onClose,
  onExcluir,
  onEditarDiasLivres,
}) => {
  
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);

  if (!habito) return null;

  const stats = obterEstatisticasHabito(habito);

  const handleFechar = () => {
    setConfirmandoExclusao(false);
    onClose();
  };

  const handleExcluir = () => {
    onExcluir(habito.id);
    setConfirmandoExclusao(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleFechar}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {habito.titulo}
          </h2>
          <button
            onClick={handleFechar}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {stats.sequenciaAtual}
            </p>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide mt-0.5">
              Atual
            </p>
          </div>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center">
            <p className="text-lg font-bold text-amber-500">🔥 {stats.recorde}</p>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide mt-0.5">
              Recorde
            </p>
          </div>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center">
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {stats.totalConclusoes}
            </p>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wide mt-0.5">
              Total
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            Últimos 30 dias
          </h3>
          <div className="grid grid-cols-10 gap-1.5">
            {stats.ultimos30Dias.map((dia) => (
              <div
                key={dia.dataISO}
                title={dia.dataISO}
                className={`aspect-square rounded-md ${dia.concluido ? 'bg-blue-600' : 'bg-zinc-100 dark:bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>

        {!confirmandoExclusao ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onEditarDiasLivres(habito)}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
            >
              Editar dias livres
            </button>
            <button
              onClick={() => setConfirmandoExclusao(true)}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
            >
              Excluir hábito
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-xl">
            <p className="text-xs text-red-700 dark:text-red-400 text-center font-medium">
              Isso apaga todo o histórico de &quot;{habito.titulo}&quot;. Não pode ser desfeito.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmandoExclusao(false)}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleExcluir}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all"
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};