'use client';

import { useState } from 'react';
import { useHabitos } from '@/hooks/useHabitos';
import { CardHabito } from '@/components/CardHabito';
import { FormNovoHabito } from '@/components/FormNovoHabito';
import { ModalDetalheHabito } from '@/components/ModalDetalheHabito';
import { ModalEditarDiasLivres } from '@/components/ModalEditarDiasLivres';
import { Habito } from '@/types/habito';

export default function HomePage() {
  const { habitos, isLoaded, confirmar, criar, excluir, atualizarDiasLivres } = useHabitos();
  const [modalAberto, setModalAberto] = useState(false);
  const [habitoSelecionado, setHabitoSelecionado] = useState<Habito | null>(null);
  const [habitoEditandoDias, setHabitoEditandoDias] = useState<Habito | null>(null);

  const handleEditarDiasLivres = (habito: Habito) => {
    setHabitoSelecionado(null);
    setHabitoEditandoDias(habito);
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 text-sm">Carregando hábitos...</p>
      </main>
    );
  }

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
    </main>
  );
}