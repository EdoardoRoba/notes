import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOutputComponent } from './get-output.component';

describe('GetOutputComponent', () => {
  let component: GetOutputComponent;
  let fixture: ComponentFixture<GetOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
