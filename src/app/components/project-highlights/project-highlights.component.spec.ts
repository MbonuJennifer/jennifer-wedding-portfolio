import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHighlightsComponent } from './project-highlights.component';

describe('ProjectHighlightsComponent', () => {
  let component: ProjectHighlightsComponent;
  let fixture: ComponentFixture<ProjectHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectHighlightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
