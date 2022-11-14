import * as React from 'react';
import Descargar from './Descargar';
import './style.css';

export default function App() {
  const [shows, setShow] = React.useState([false, false, false, false, false]);
  const handleTogle = (indi: number) => {
    console.log(shows[indi]);
    const temp = [...shows];
    temp[indi] = !temp[indi];
    setShow(temp);
  };
  return (
    <div>
      <pre>{JSON.stringify(shows)}</pre>
      <br />
      {shows.map((show, index) => (
        <Descargar
          indice={index + 1}
          show={show}
          togle={() => handleTogle(index)}
        />
      ))}
    </div>
  );
}
