'use client';

import React, { useState } from 'react';

interface ModalContadorDiasProps {
  valorAtual: number | null; // null = ativando pela primeira vez; number = editando meta ativa
  onClose: () => void;
  onSalvar: (totalDias: number) => void;
  onDesativar: () => void;
}

// Este componente só deve ser incluído na árvore pelo pai quando o modal estiver
// de fato aberto (ex.: `{modalAberto && <ModalContadorDias ... />}`), nunca mantido
// montado com um "if (!isOpen) return null" interno. Assim, cada abertura é uma
// montagem nova, e o useState abaixo sempre inicializa com o `valorAtual` correto
// no momento da abertura — inclusive ao reabrir para editar um valor diferente.
export const ModalContadorDias: React.FC<ModalContadorDiasProps> = ({
  valorAtual,
  onClose,
  onSalvar,
  onDesativar,
}) => {
  const [dias, setDias] = useState<string>(valorAtual !== null ? String(valorAtual) : '');

  const numeroValido = Number(dias) > 0 && Number.isInteger(Number(dias));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroValido) return;
    onSalvar(Number(dias));
    setDias('');
    onClose();
  };

  const handleDesativar = () => {
    onDesativar();
    setDias('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Contador de dias
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="totalDias"
              className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2"
            >
              Quantos dias úteis até o OBJETIVO?
            </label>
            <input
              id="totalDias"
              type="number"
              inputMode="numeric"
              min={1}
              autoFocus
              placeholder="Ex: 30"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Sábados e domingos não contam — o contador só desconta de segunda a
              sexta.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-medium text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!numeroValido}
              className="px-5 py-2.5 rounded-xl font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
            >
              {valorAtual !== null ? 'Salvar' : 'Ativar'}
            </button>
          </div>

          {valorAtual !== null && (
            <button
              type="button"
              onClick={handleDesativar}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
            >
              Desativar contador
            </button>
          )}
        </form>
      </div>
    </div>
  );
};