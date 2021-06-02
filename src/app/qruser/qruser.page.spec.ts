import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QruserPage } from './qruser.page';

describe('QruserPage', () => {
  let component: QruserPage;
  let fixture: ComponentFixture<QruserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QruserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QruserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
