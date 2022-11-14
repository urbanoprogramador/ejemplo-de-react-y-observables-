import * as React from 'react';
import { descargar } from './observables';

type Props = {
  indice: number;
  show: boolean;
  togle: () => void;
};
export default function Descargar({ indice, show, togle }: Props) {
  return (
    <div>
      {show ? (
        <div>
          <button
            onClick={() => {
              const time = Math.round(Math.random() * (7000 - 1000) + 1000);
              descargar('descarga/' + indice, time);
            }}
          >
            Descargar {indice}
          </button>
          <button onClick={togle}>Ocultar {indice}</button>
        </div>
      ) : (
        <button onClick={togle}>mostrar {indice}</button>
      )}
    </div>
  );
}
