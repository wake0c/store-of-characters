import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterButtonComponent } from './create-character-button.component';

describe('CreateCharacterButtonComponent', () => {
  let component: CreateCharacterButtonComponent;
  let fixture: ComponentFixture<CreateCharacterButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCharacterButtonComponent]
    });
    fixture = TestBed.createComponent(CreateCharacterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
