import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCharacterComponent } from './create-new-character.component';

describe('CreateNewCharacterComponent', () => {
  let component: CreateNewCharacterComponent;
  let fixture: ComponentFixture<CreateNewCharacterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewCharacterComponent]
    });
    fixture = TestBed.createComponent(CreateNewCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
