import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptrejPage } from './acceptrej.page';

describe('AcceptrejPage', () => {
  let component: AcceptrejPage;
  let fixture: ComponentFixture<AcceptrejPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptrejPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptrejPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
