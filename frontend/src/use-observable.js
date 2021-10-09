import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { useEffect, useState } from 'react';

/**
 * Custom hook to make an API call and return an empty object on failure
 *
 * @param observable$ - RxJs Observable
 * @returns - an object with error and state, state holds the data from the API call
 */
const useObservable = (observable$) => {
  const [state, setState] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const subscription$ = observable$
          .pipe(
            catchError((error) => {
              setError(error);

              return of({});
            })
          )
          .subscribe(setState);

    return () => subscription$.unsubscribe();
  }, [observable$]);

  return {error, state};
};

export {useObservable};
