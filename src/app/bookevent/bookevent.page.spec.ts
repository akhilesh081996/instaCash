import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookeventPage } from './bookevent.page';

describe('BookeventPage', () => {
  let component: BookeventPage;
  let fixture: ComponentFixture<BookeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
