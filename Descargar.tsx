import * as React from 'react';
import { descargar } from './observables';
import { Modal } from './Modal';

type Props = {
  indice: number;
  show: boolean;
  togle: () => void;
};
export default function Descargar({ indice, show, togle }: Props) {
  const [mensaje, setMensaje] = React.useState('');
  return (
    <div>
      {show ? (
        <div>
          <button
            onClick={() => {
              const time = Math.round(Math.random() * (7000 - 3000) + 3000);
              descargar('descarga/' + indice, time).then(([, mensaje]) => {
                console.log('este es el mensaje ', mensaje);
                setMensaje(mensaje);
              });
            }}
          >
            Descargar {indice}
          </button>
          <button onClick={togle}>Ocultar {indice}</button>
          {mensaje && (
            <Modal>
              <button onClick={() => setMensaje('')}>x</button>
              <p>
                del modal de {indice} - {mensaje}
              </p>
            </Modal>
          )}
        </div>
      ) : (
        <button onClick={togle}>mostrar {indice}</button>
      )}
    </div>
  );
}
