import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SorryPage } from './sorry.page';

describe('SorryPage', () => {
  let component: SorryPage;
  let fixture: ComponentFixture<SorryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SorryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
