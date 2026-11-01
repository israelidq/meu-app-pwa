'use client';

import React from 'react';

interface SeletorDiasLivresProps {
  diasLivres: number[];
  onChange: (diasLivres: number[]) => void;
}

// 0 = domingo, 6 = sábado (padrão Date.getDay())
const OPCOES = [
  { valor: 6, rotulo: 'Sábado é dia livre (não quebra a sequência)' },
  { valor: 0, rotulo: 'Domingo é dia livre (não quebra a sequência)' },
];

export const SeletorDiasLivres: React.FC<SeletorDiasLivresProps> = ({
  diasLivres,
  onChange,
}) => {
  const alternar = (valor: number, marcado: boolean) => {
    if (marcado) {
      onChange([...diasLivres, valor]);
    } else {
      onChange(diasLivres.filter((d) => d !== valor));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {OPCOES.map((opcao) => (
        <label
          key={opcao.valor}
          className="flex items-center gap-3 px-1 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={diasLivres.includes(opcao.valor)}
            onChange={(e) => alternar(opcao.valor, e.target.checked)}
            className="w-5 h-5 rounded-md accent-blue-600"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {opcao.rotulo}
          </span>
        </label>
      ))}
    </div>
  );
};