import * as React from 'react';
import Descargar from './Descargar';
import { vigilar$ } from './observables';
import './style.css';

export default function App() {
  const [shows, setShow] = React.useState([true, false, true, false, true]);
  const handleTogle = (indi: number) => {
    console.log(shows[indi]);
    const temp = [...shows];
    temp[indi] = !temp[indi];
    setShow(temp);
  };
  React.useEffect(() => {
    //subject
    const sub = vigilar$.subscribe((algo) =>
      console.warn('peticion correcta a :', algo)
    );
    return () => sub.unsubscribe();
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(shows)}</pre>
      <br />
      {shows.map((show, index) => (
        <Descargar
          key={index}
          indice={index + 1}
          show={show}
          togle={() => handleTogle(index)}
        />
      ))}
    </div>
  );
}
