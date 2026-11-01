import { ContadorObjetivo } from '@/types/contador';

const CHAVE_STORAGE = 'contador_objetivo_v1';

const CONTADOR_PADRAO: ContadorObjetivo = {
  ativo: false,
  totalDias: 0,
  dataInicio: '',
};

export const carregarContadorStorage = (): ContadorObjetivo => {
  if (typeof window === 'undefined') return CONTADOR_PADRAO;
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (!dados) return CONTADOR_PADRAO;
    return { ...CONTADOR_PADRAO, ...JSON.parse(dados) };
  } catch (erro) {
    console.error('Erro ao carregar contador do localStorage:', erro);
    return CONTADOR_PADRAO;
  }
};

export const salvarContadorStorage = (contador: ContadorObjetivo): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(contador));
  } catch (erro) {
    console.error('Erro ao salvar contador no localStorage:', erro);
  }
};