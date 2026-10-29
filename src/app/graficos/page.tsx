'use client';

import { useState, useEffect } from 'react';
import { Habito } from '@/types/habito';
import { carregarHabitosStorage } from '@/utils/storageUtils';
import { reconciliarSequencia } from '@/utils/habitoUtils';
import { obterDataLocalISO } from '@/utils/dateUtils';

interface DiaSemana {
  dataISO: string;
  rotulo: string;
}

export default function GraficosPage() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [ultimosDias, setUltimosDias] = useState<DiaSemana[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dados = carregarHabitosStorage().map(reconciliarSequencia);
    setHabitos(dados);

    const dias: DiaSemana[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const nomeDia = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      dias.push({ dataISO: obterDataLocalISO(d), rotulo: nomeDia });
    }
    setUltimosDias(dias);

    setIsLoaded(true);
  }, []);

  const calcularConclusoesNoDia = (dataISO: string) => {
    return habitos.reduce((total, habito) => {
      const concluidoNoDia = habito.historico.includes(dataISO);
      return total + (concluidoNoDia ? 1 : 0);
    }, 0);
  };

  const totalConclusoesGeral = habitos.reduce((acc, h) => acc + h.historico.length, 0);
  const maiorSequencia = habitos.reduce(
    (max, h) => (h.diasSeguidos > max ? h.diasSeguidos : max),
    0
  );

  if (!isLoaded) {
    return (
      <main className="min-h-screen p-4 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Carregando estatísticas...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-md mx-auto p-4 pb-24 font-sans">
      <header className="my-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Relatórios
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Acompanhe o seu progresso e consistência
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Total Concluídos
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalConclusoesGeral}
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Maior Ofensiva
          </p>
          <p className="text-2xl font-bold text-amber-500 flex items-center gap-1">
            🔥 {maiorSequencia}
          </p>
        </div>
      </section>

      <section className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
          Consistência nos Últimos 7 Dias
        </h2>

        {habitos.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            Cadastre hábitos para visualizar o gráfico semanal.
          </p>
        ) : (
          <div className="flex justify-between items-end h-36 pt-4 px-2 border-b border-slate-100 dark:border-slate-800">
            {ultimosDias.map((dia) => {
              const quantidade = calcularConclusoesNoDia(dia.dataISO);
              const alturaCalculada = Math.min(quantidade * 24, 100);

              return (
                <div key={dia.dataISO} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {quantidade > 0 ? quantidade : ''}
                  </span>
                  <div className="w-8 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-24 flex items-end justify-center overflow-hidden">
                    <div
                      style={{ height: `${alturaCalculada}px` }}
                      className="w-full bg-blue-600 rounded-t-lg transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 uppercase">
                    {dia.rotulo}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}