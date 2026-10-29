export function obterDataLocalISO(data: Date = new Date()): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function obterDataAtualISO(): string {
  return obterDataLocalISO(new Date());
}

export function diferencaEmDias(inicioISO: string, fimISO: string): number {
  const [a1, m1, d1] = inicioISO.split('-').map(Number);
  const [a2, m2, d2] = fimISO.split('-').map(Number);
  const inicio = Date.UTC(a1, m1 - 1, d1);
  const fim = Date.UTC(a2, m2 - 1, d2);
  return Math.round((fim - inicio) / 86_400_000);
}

export function diaDaSemanaISO(dataISO: string): number {
  const [ano, mes, dia] = dataISO.split('-').map(Number);
  return new Date(ano, mes - 1, dia).getDay();
}

export function adicionarDiasISO(dataISO: string, quantidade: number): string {
  const [ano, mes, dia] = dataISO.split('-').map(Number);
  const d = new Date(ano, mes - 1, dia);
  d.setDate(d.getDate() + quantidade);
  return obterDataLocalISO(d);
}