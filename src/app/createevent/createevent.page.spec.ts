import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateeventPage } from './createevent.page';

describe('CreateeventPage', () => {
  let component: CreateeventPage;
  let fixture: ComponentFixture<CreateeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
