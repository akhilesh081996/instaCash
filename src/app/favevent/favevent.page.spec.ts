import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaveventPage } from './favevent.page';

describe('FaveventPage', () => {
  let component: FaveventPage;
  let fixture: ComponentFixture<FaveventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaveventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaveventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
