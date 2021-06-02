import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplygiftcardPage } from './applygiftcard.page';

describe('ApplygiftcardPage', () => {
  let component: ApplygiftcardPage;
  let fixture: ComponentFixture<ApplygiftcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplygiftcardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplygiftcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
