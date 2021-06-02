import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookedeventPage } from './bookedevent.page';

describe('BookedeventPage', () => {
  let component: BookedeventPage;
  let fixture: ComponentFixture<BookedeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookedeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
