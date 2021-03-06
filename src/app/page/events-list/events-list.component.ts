import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList: BehaviorSubject<Event[]> = this.eventService.list$;
  /* testEvent: Observable<Event> = this.eventService.get(2); */

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void { }

  onDelete(event: Event): void {
    this.eventService.remove(event).subscribe(
      () => console.log('deleted')
    );
  }
}
