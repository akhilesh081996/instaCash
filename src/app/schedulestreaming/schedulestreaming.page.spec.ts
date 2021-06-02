import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedulestreamingPage } from './schedulestreaming.page';

describe('SchedulestreamingPage', () => {
  let component: SchedulestreamingPage;
  let fixture: ComponentFixture<SchedulestreamingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulestreamingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulestreamingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
