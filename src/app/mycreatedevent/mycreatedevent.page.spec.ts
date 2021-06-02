import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MycreatedeventPage } from './mycreatedevent.page';

describe('MycreatedeventPage', () => {
  let component: MycreatedeventPage;
  let fixture: ComponentFixture<MycreatedeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycreatedeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MycreatedeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
