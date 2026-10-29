import { Habito } from '@/types/habito';

const CHAVE_STORAGE = 'habitos_pwa_dados_v1';

export const carregarHabitosStorage = (): Habito[] => {
  if (typeof window === 'undefined') return [];
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (!dados) return [];
    const parsed: Habito[] = JSON.parse(dados);
    return parsed.map((h) => ({
      ...h,
      maiorSequenciaHistorica: h.maiorSequenciaHistorica ?? h.diasSeguidos ?? 0,
      diasLivres: h.diasLivres ?? [], // hábitos antigos ficam sem dia livre por padrão
    }));
  } catch (erro) {
    console.error('Erro ao carregar hábitos do localStorage:', erro);
    return [];
  }
};

export const salvarHabitosStorage = (habitos: Habito[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(habitos));
  } catch (erro) {
    console.error('Erro ao salvar hábitos no localStorage:', erro);
  }
};