import { TrademarkRegistered } from 'phosphor-react';

export function Header(): JSX.Element {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between pb-8">
      <h1 className="text-3xl font-bold italic">Taskx</h1>
      <div
        className="flex justify-center items-center gap-1 hover:text-cyan-700
        transition-colors"
      >
        <span>made by jilvanx</span>
        <TrademarkRegistered size={24} />
      </div>
    </div>
  );
}
