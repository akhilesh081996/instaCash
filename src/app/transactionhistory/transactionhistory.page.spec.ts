import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionhistoryPage } from './transactionhistory.page';

describe('TransactionhistoryPage', () => {
  let component: TransactionhistoryPage;
  let fixture: ComponentFixture<TransactionhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionhistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
