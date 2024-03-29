import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventdetailPage } from './eventdetail.page';

describe('EventdetailPage', () => {
  let component: EventdetailPage;
  let fixture: ComponentFixture<EventdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
