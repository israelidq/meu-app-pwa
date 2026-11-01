'use client';

import { useState, useEffect } from 'react';
import { Habito } from '@/types/habito';
import { carregarHabitosStorage, salvarHabitosStorage } from '@/utils/storageUtils';
import { confirmarHabitoHoje, reconciliarSequencia } from '@/utils/habitoUtils';

export function useHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dados = carregarHabitosStorage().map(reconciliarSequencia);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHabitos(dados);
    setIsLoaded(true);
  }, []);

  const confirmar = (id: string) => {
    setHabitos((prev) => {
      const atualizado = prev.map((h) => (h.id === id ? confirmarHabitoHoje(h) : h));
      salvarHabitosStorage(atualizado);
      return atualizado;
    });
  };

  const criar = (titulo: string, diasLivres: number[] = []) => {
    setHabitos((prev) => {
      const novo: Habito = {
        id: crypto.randomUUID(),
        titulo,
        diasSeguidos: 0,
        maiorSequenciaHistorica: 0,
        ultimaConfirmacao: '',
        historico: [],
        diasLivres,
      };
      const atualizado = [...prev, novo];
      salvarHabitosStorage(atualizado);
      return atualizado;
    });
  };

  const excluir = (id: string) => {
    setHabitos((prev) => {
      const atualizado = prev.filter((h) => h.id !== id);
      salvarHabitosStorage(atualizado);
      return atualizado;
    });
  };

  const atualizarDiasLivres = (id: string, diasLivres: number[]) => {
    setHabitos((prev) => {
      const atualizado = prev.map((h) =>
        h.id === id ? { ...h, diasLivres } : h
      );
      salvarHabitosStorage(atualizado);
      return atualizado;
    });
  };

  return { habitos, isLoaded, confirmar, criar, excluir, atualizarDiasLivres };
}