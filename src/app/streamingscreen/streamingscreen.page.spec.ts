import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreamingscreenPage } from './streamingscreen.page';

describe('StreamingscreenPage', () => {
  let component: StreamingscreenPage;
  let fixture: ComponentFixture<StreamingscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamingscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamingscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
