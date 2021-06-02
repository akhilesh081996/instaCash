import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllevenPage } from './alleven.page';

describe('AllevenPage', () => {
  let component: AllevenPage;
  let fixture: ComponentFixture<AllevenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllevenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllevenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
