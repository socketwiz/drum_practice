
import { ajax } from 'rxjs/ajax';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { pairwise, switchMap, tap } from 'rxjs/operators';
import { Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import React from 'react';

function UseAjax(url, options) {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  const [state, setState] = useState('READY');

  const { body, onLoad = true, method = 'GET' } = options ?? {};

  const callApi = useCallback(() => {
    if (url) {
      const props = {
        body: body,
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      };

      setState('LOADING');
      ajax(props).pipe(
        catchError((error) => {
          setState('ERROR');
          setErrorMsg(error);

          return of(error);
        })
      ).subscribe((data) => {
        if (data?.status.toString().charAt(0) === '2') { // 2xx status
          setState('SUCCESS');
          setData(data);
        }
      });
    }
  }, [body, method, url]);

  useEffect(() => {
    if (onLoad) {
      callApi(url, method);
    }
  }, [callApi, method, onLoad, url]);

  useEffect(() => {
    switch (errorMsg?.status) {
      case 500:
      case 404:
        setError({
          body: 'Error while connecting to server',
          title: errorMsg.message,
          type: 'error'
        });
        break;
      case 200:
        break;

      default:
        setError(errorMsg);
    }
  }, [errorMsg]);

  return { callApi, error, data, state };
}

export default UseAjax;
