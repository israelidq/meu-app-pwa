export interface Habito {
  id: string;
  titulo: string;
  diasSeguidos: number;
  maiorSequenciaHistorica: number;
  ultimaConfirmacao: string;
  historico: string[];
  diasLivres: number[];
}