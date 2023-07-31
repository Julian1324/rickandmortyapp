import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLoadingComponent } from './character-loading.component';

describe('CharacterLoadingComponent', () => {
  let component: CharacterLoadingComponent;
  let fixture: ComponentFixture<CharacterLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
