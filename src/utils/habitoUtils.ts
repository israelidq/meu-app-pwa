import { Habito } from '@/types/habito';
import {
  obterDataAtualISO,
  diferencaEmDias,
  obterDataLocalISO,
  diaDaSemanaISO,
  adicionarDiasISO,
} from './dateUtils';

export function foiConfirmadoHoje(habito: Habito): boolean {
  const hoje = obterDataAtualISO();
  return habito.ultimaConfirmacao === hoje;
}

function sequenciaContinua(
  ultimaConfirmacaoISO: string,
  hojeISO: string,
  diasLivres: number[]
): boolean {
  const diff = diferencaEmDias(ultimaConfirmacaoISO, hojeISO);
  if (diff <= 1) return true;

  for (let i = 1; i < diff; i++) {
    const dataISO = adicionarDiasISO(ultimaConfirmacaoISO, i);
    const diaSemana = diaDaSemanaISO(dataISO);
    if (!diasLivres.includes(diaSemana)) {
      return false;
    }
  }
  return true;
}

export function confirmarHabitoHoje(habito: Habito): Habito {
  const hoje = obterDataAtualISO();

  if (habito.ultimaConfirmacao === hoje) {
    return habito;
  }

  const continuou = habito.ultimaConfirmacao
    ? sequenciaContinua(habito.ultimaConfirmacao, hoje, habito.diasLivres)
    : false;

  const novaSequencia = continuou ? habito.diasSeguidos + 1 : 1;

  return {
    ...habito,
    diasSeguidos: novaSequencia,
    maiorSequenciaHistorica: Math.max(habito.maiorSequenciaHistorica, novaSequencia),
    ultimaConfirmacao: hoje,
    historico: habito.historico.includes(hoje)
      ? habito.historico
      : [...habito.historico, hoje],
  };
}

export function reconciliarSequencia(habito: Habito): Habito {
  if (!habito.ultimaConfirmacao) return habito;
  const hoje = obterDataAtualISO();
  const continua = sequenciaContinua(habito.ultimaConfirmacao, hoje, habito.diasLivres);
  return continua ? habito : { ...habito, diasSeguidos: 0 };
}

export interface EstatisticasHabito {
  totalConclusoes: number;
  sequenciaAtual: number;
  recorde: number;
  ultimos30Dias: { dataISO: string; concluido: boolean }[];
}

export function obterEstatisticasHabito(habito: Habito): EstatisticasHabito {
  const ultimos30Dias = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dataISO = obterDataLocalISO(d);
    ultimos30Dias.push({
      dataISO,
      concluido: habito.historico.includes(dataISO),
    });
  }

  return {
    totalConclusoes: habito.historico.length,
    sequenciaAtual: habito.diasSeguidos,
    recorde: habito.maiorSequenciaHistorica,
    ultimos30Dias,
  };
}