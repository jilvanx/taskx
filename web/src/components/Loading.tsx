import { SpinnerGap } from 'phosphor-react';

export function Loading(): JSX.Element {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <SpinnerGap size={24} weight="bold" />
      </div>
    </div>
  );
}
