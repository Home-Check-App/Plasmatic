import { Subscription, Observable } from 'rxjs';

export const onEmit = <T>(source: Observable<T>, nextFn: (value: T) => void): Subscription => {
  return source.subscribe({
    next: nextFn,
    error: err => {
      console.log(err);
    },
  });
};
