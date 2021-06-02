import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivestreameventPage } from './livestreamevent.page';

describe('LivestreameventPage', () => {
  let component: LivestreameventPage;
  let fixture: ComponentFixture<LivestreameventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestreameventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivestreameventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
