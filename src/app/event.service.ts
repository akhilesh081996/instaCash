import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private eventSubject = new Subject<any>();

  publishEvent(data:any){
    this.eventSubject.next(data);
  }
  
  getEvent(): Subject <any> {
    return this.eventSubject

  }
}
