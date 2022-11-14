import { Subject, timer } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

const subject$ = new Subject<[string, number]>();
let stringArray: string[] = [];
const validarPeticion = ([url]: [string, number]) => {
  if (stringArray.length === 0) return true;
  const existe = stringArray.find((e) => e === url);
  return existe ? false : true;
};
const realizar_peticion = ([url, time]) => {
  stringArray.push(url);
  return timer(time).pipe(
    tap(() => {
      stringArray = stringArray.filter((e) => e !== url);
    }),
    map(() => `${url} y ademas tardo ${time} ms`)
  );
};

export const vigilar$ = subject$.pipe(filter(validarPeticion));

export const descargarS = (params: string, time: number) => {
  const sub = vigilar$.pipe(map(realizar_peticion)).subscribe((accion) => {
    accion.subscribe((a) => alert(a));
    sub.unsubscribe();
  });
  subject$.next([params, time]);
  return sub;
};
export const descargar = (params: string, time: number) => {
  console.log(params, time);
  return new Promise<[boolean, string]>((resolve) => {
    const sub = vigilar$.pipe(map(realizar_peticion)).subscribe((accion) => {
      accion.subscribe((a) => {
        resolve([true, a]);
      });
      sub.unsubscribe();
    });
    subject$.next([params, time]);
  });
};
export const descarga3r = (params: string, time: number) => {
  console.log(params, time);
  const sub = vigilar$;
  subject$.next([params, time]);
  return sub;
};
