import { Subject, timer } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

export const subject$ = new Subject<[string, number]>();

let stringArray: string[] = [];

subject$
  .pipe(
    filter(([url]) => {
      if (stringArray.length === 0) return true;
      const existe = stringArray.find((e) => e === url);
      return existe ? false : true;
    }),
    map(([url, time]) => {
      console.log('uno', url, time);
      stringArray.push(url);
      return timer(time).pipe(
        tap(() => {
          stringArray = stringArray.filter((e) => e !== url);
        }),
        map(() => `${url} y ademas tardo ${time} ms`)
      );
    })
  )
  .subscribe((accion) => accion.subscribe((a) => alert(a)));

export const descargar = (params: string, time: number) => {
  subject$.next([params, time]);
};
