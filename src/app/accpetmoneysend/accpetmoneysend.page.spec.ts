import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccpetmoneysendPage } from './accpetmoneysend.page';

describe('AccpetmoneysendPage', () => {
  let component: AccpetmoneysendPage;
  let fixture: ComponentFixture<AccpetmoneysendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccpetmoneysendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccpetmoneysendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
