import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfertobankPage } from './transfertobank.page';

describe('TransfertobankPage', () => {
  let component: TransfertobankPage;
  let fixture: ComponentFixture<TransfertobankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertobankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfertobankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
