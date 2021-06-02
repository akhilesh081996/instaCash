import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyticketPage } from './myticket.page';

describe('MyticketPage', () => {
  let component: MyticketPage;
  let fixture: ComponentFixture<MyticketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyticketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyticketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
