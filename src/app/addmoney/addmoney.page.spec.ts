import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmoneyPage } from './addmoney.page';

describe('AddmoneyPage', () => {
  let component: AddmoneyPage;
  let fixture: ComponentFixture<AddmoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
