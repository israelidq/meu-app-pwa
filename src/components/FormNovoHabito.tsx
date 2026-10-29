'use client';

import React, { useState } from 'react';

interface FormNovoHabitoProps {
  isOpen: boolean;
  onClose: () => void;
  onCriarHabito: (titulo: string, diasLivres: number[]) => void;
}

export const FormNovoHabito: React.FC<FormNovoHabitoProps> = ({
  isOpen,
  onClose,
  onCriarHabito,
}) => {
  const [titulo, setTitulo] = useState('');
  const [domingoLivre, setDomingoLivre] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    onCriarHabito(titulo.trim(), domingoLivre ? [0] : []);
    setTitulo('');
    setDomingoLivre(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Novo Hábito</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 text-lg font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="titulo" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Nome do Hábito
            </label>
            <input
              id="titulo"
              type="text"
              autoFocus
              placeholder="Ex: Ler 20 páginas, Meditar..."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <label className="flex items-center gap-3 px-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={domingoLivre}
              onChange={(e) => setDomingoLivre(e.target.checked)}
              className="w-5 h-5 rounded-md accent-blue-600"
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Domingo é dia livre (não quebra a sequência)
            </span>
          </label>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl font-medium text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!titulo.trim()}
              className="px-5 py-2.5 rounded-xl font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
            >
              Criar Hábito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};