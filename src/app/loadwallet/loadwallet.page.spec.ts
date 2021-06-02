import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadwalletPage } from './loadwallet.page';

describe('LoadwalletPage', () => {
  let component: LoadwalletPage;
  let fixture: ComponentFixture<LoadwalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadwalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
