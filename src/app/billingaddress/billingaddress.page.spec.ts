import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillingaddressPage } from './billingaddress.page';

describe('BillingaddressPage', () => {
  let component: BillingaddressPage;
  let fixture: ComponentFixture<BillingaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingaddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillingaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
