import { Observable, take } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export function getDataFromServiceById<T>(serviceMethod: (id: number) => Observable<T>, subject: BehaviorSubject<T>, id: number): void {
  serviceMethod(id).pipe(take(1)).subscribe((data) => {
    subject.next(data);
  });
}

export function getDataFromService<T>(
  serviceMethod: () => Observable<T>,
  subject: BehaviorSubject<T>
): void {
  serviceMethod().pipe(take(1)).subscribe((data) => {
    subject.next(data);
  });
}