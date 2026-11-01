'use client';

import { useState, useEffect } from 'react';
import { ContadorObjetivo } from '@/types/contador';
import { carregarContadorStorage, salvarContadorStorage } from '@/utils/contadorUtils';
import { obterDataAtualISO } from '@/utils/dateUtils';

const CONTADOR_PADRAO: ContadorObjetivo = {
  ativo: false,
  totalDias: 0,
  dataInicio: '',
};

export function useContador() {
  const [contador, setContador] = useState<ContadorObjetivo>(CONTADOR_PADRAO);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dados = carregarContadorStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContador(dados);
    setIsLoaded(true);
  }, []);

  // Primeira ativação: começa a contar a partir de hoje.
  const ativar = (totalDias: number) => {
    const novo: ContadorObjetivo = {
      ativo: true,
      totalDias,
      dataInicio: obterDataAtualISO(),
    };
    setContador(novo);
    salvarContadorStorage(novo);
  };

  // Redefine a meta de um contador já ativo, preservando a data de início
  // (para não perder o progresso de dias úteis já descontados).
  const atualizarTotalDias = (totalDias: number) => {
    setContador((prev) => {
      const novo: ContadorObjetivo = {
        ativo: true,
        totalDias,
        dataInicio: prev.dataInicio || obterDataAtualISO(),
      };
      salvarContadorStorage(novo);
      return novo;
    });
  };

  const desativar = () => {
    setContador(CONTADOR_PADRAO);
    salvarContadorStorage(CONTADOR_PADRAO);
  };

  return { contador, isLoaded, ativar, atualizarTotalDias, desativar };
}