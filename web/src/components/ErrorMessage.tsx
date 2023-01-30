import { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function ErrorMessage({ message }: { message: string }): JSX.Element {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      toast.error(message ?? 'Houve um erro inesperado', {
        duration: 5000,
        position: 'top-right'
      });
      isFirstRender.current = false;
    }
  }, [message]);

  return <Toaster />;
}
