import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendwaltobankPage } from './sendwaltobank.page';

describe('SendwaltobankPage', () => {
  let component: SendwaltobankPage;
  let fixture: ComponentFixture<SendwaltobankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendwaltobankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendwaltobankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
