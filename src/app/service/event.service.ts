import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventUrl = "http://localhost:3000/list";

  private list: Event[] = [
    {
      id: 1,
      name: 'Angular Connect',
      date: '9/26/2036',
      time: '10am',
      location: { address: '1 London Rd', city: 'London', country: 'England' }
    },
    {
      id: 2,
      name: 'ng-nl',
      date: '4/15/2037',
      time: '9am',
      location: { address: '127 DT ', city: 'Amsterdam', country: 'NL' }
    },
    {
      id: 3,
      name: 'ng-conf 2037',
      date: '4/15/2037',
      time: '9am',
      location: { address: 'The Palatial America Hotel', city: 'Salt Lake City', country: 'USA' }
    },
    {
      id: 4,
      name: 'UN Angular Summit',
      date: '6/10/2037',
      time: '8am',
      location: { address: 'The UN Angular Center', city: 'New York', country: 'USA' }
    },
  ];

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(this.list);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next(this.list);
  }

  /* getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl);
  } */

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: Event | undefined = this.list.find(item => item.id === id);
    if (ev) {
      return of(ev);
    }

    return of(new Event());
  }

  /*  get(event: Event): Observable<Event> {
     return this.http.get<Event>(`${this.eventUrl}/${event.id}`);
   } */

  /* create(event: Event): Observable<any> {
    return this.http.post<Observable<any>>(this.eventUrl, event);
  } */

  create(event: Event): Observable<Event> {
    let counter: number = Math.floor(Math.random() * 1000);
    event.id += counter;
    this.list.push(event);
    this.getAll();
    return of(event)
  }


  update(event: Event): Observable<Event> {
    const index: number = this.list.findIndex(item => item.id === event.id);
    this.list.splice(index, 1, event);
    this.getAll();
    return of(this.list[index]);
  }


  remove(event: Event): Observable<Event[]> | any {
    const index: number = this.list.findIndex(item => item.id === event.id);
    this.list.splice(index, 1);
    this.getAll();
    return this.list;
  }

  /* update(event: Event): Observable<Event> {
    return this.http.patch<Event>(`${this.eventUrl}/${event.id}`, event);
  }

  remove(event: Event): Observable<Event> {
    return this.http.delete<Event>(`${this.eventUrl}/${event.id}`);
  } */

}