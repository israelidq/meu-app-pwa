'use client';

import { useState } from 'react';
import { useHabitos } from '@/hooks/useHabitos';
import { useContador } from '@/hooks/useContador';
import { CardHabito } from '@/components/CardHabito';
import { FormNovoHabito } from '@/components/FormNovoHabito';
import { ModalDetalheHabito } from '@/components/ModalDetalheHabito';
import { ModalEditarDiasLivres } from '@/components/ModalEditarDiasLivres';
import { ModalContadorDias } from '@/components/ModalContadorDias';
import { Habito } from '@/types/habito';
import { contarDiasUteisDecorridos } from '@/utils/dateUtils';

export default function HomePage() {
  const { habitos, isLoaded, confirmar, criar, excluir, atualizarDiasLivres } = useHabitos();
  const {
    contador,
    isLoaded: contadorCarregado,
    ativar,
    atualizarTotalDias,
    desativar,
  } = useContador();
  const [modalAberto, setModalAberto] = useState(false);
  const [habitoSelecionado, setHabitoSelecionado] = useState<Habito | null>(null);
  const [habitoEditandoDias, setHabitoEditandoDias] = useState<Habito | null>(null);
  const [modalContadorAberto, setModalContadorAberto] = useState(false);

  const handleEditarDiasLivres = (habito: Habito) => {
    setHabitoSelecionado(null);
    setHabitoEditandoDias(habito);
  };

  if (!isLoaded || !contadorCarregado) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 text-sm">Carregando hábitos...</p>
      </main>
    );
  }

  const diasRestantes = contador.ativo
    ? Math.max(contador.totalDias - contarDiasUteisDecorridos(contador.dataInicio), 0)
    : 0;

  return (
    <main className="min-h-screen max-w-md mx-auto p-4 pb-24">
      <header className="my-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meus Hábitos</h1>
        <button
          onClick={() => setModalAberto(true)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white text-xl font-bold active:scale-95 transition-all"
        >
          +
        </button>
      </header>

      {contador.ativo ? (
        <button
          onClick={() => setModalContadorAberto(true)}
          className="w-full mb-6 p-4 bg-blue-600 rounded-2xl text-left active:scale-[0.98] transition-all shadow-md shadow-blue-500/20"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
            Objetivo
          </p>
          <p className="text-lg font-bold text-white mt-0.5">
            {diasRestantes > 0
              ? `Faltam ${diasRestantes} ${diasRestantes === 1 ? 'dia útil' : 'dias úteis'} para o OBJETIVO`
              : 'Objetivo concluído! 🎉'}
          </p>
        </button>
      ) : (
        <button
          onClick={() => setModalContadorAberto(true)}
          className="w-full mb-6 py-3 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-500 dark:text-slate-400 active:scale-[0.98] transition-all"
        >
          + Ativar contador de dias
        </button>
      )}

      {habitos.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-10">
          Nenhum hábito ainda. Toque em + para criar o primeiro.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {habitos.map((h) => (
            <CardHabito
              key={h.id}
              habito={h}
              onConfirmar={confirmar}
              onSelecionar={setHabitoSelecionado}
            />
          ))}
        </div>
      )}

      <FormNovoHabito
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onCriarHabito={criar}
      />

      <ModalDetalheHabito
        habito={habitoSelecionado}
        onClose={() => setHabitoSelecionado(null)}
        onExcluir={excluir}
        onEditarDiasLivres={handleEditarDiasLivres}
      />

      <ModalEditarDiasLivres
        habito={habitoEditandoDias}
        onClose={() => setHabitoEditandoDias(null)}
        onSalvar={atualizarDiasLivres}
      />

      {modalContadorAberto && (
        <ModalContadorDias
          valorAtual={contador.ativo ? contador.totalDias : null}
          onClose={() => setModalContadorAberto(false)}
          onSalvar={(dias) => (contador.ativo ? atualizarTotalDias(dias) : ativar(dias))}
          onDesativar={desativar}
        />
      )}
    </main>
  );
}