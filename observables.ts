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
    map(() => [`${url} y ademas tardo ${time} ms`, url])
  );
};

export const vigilar$ = subject$.pipe(filter(validarPeticion));

export const descargar = (params: string, time: number) => {
  console.log(params, time);
  return new Promise<[boolean, string]>((resolve) => {
    const sub = vigilar$.pipe(map(realizar_peticion)).subscribe((accion) => {
      accion
        .pipe(
          filter((r) => {
            return r[1] === params;
          })
        )
        .subscribe((a) => {
          resolve([true, a[0]]);
        });
    });
    subject$.next([params, time]);
    sub.unsubscribe();
  });
};
