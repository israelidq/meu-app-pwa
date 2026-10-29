export interface Habito {
  id: string;
  titulo: string;
  diasSeguidos: number;
  maiorSequenciaHistorica: number;
  ultimaConfirmacao: string;
  historico: string[];
  diasLivres: number[]; // dias da semana (0=dom..6=sáb) que não quebram a sequência
}