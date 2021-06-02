import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiveeventPage } from './liveevent.page';

describe('LiveeventPage', () => {
  let component: LiveeventPage;
  let fixture: ComponentFixture<LiveeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
