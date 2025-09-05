import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wedding2Component } from './wedding2.component';

describe('Wedding2Component', () => {
  let component: Wedding2Component;
  let fixture: ComponentFixture<Wedding2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wedding2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Wedding2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
