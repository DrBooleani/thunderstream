import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedVideoComponent } from './embedded-video.component';

describe('EmbeddedVideoComponent', () => {
  let component: EmbeddedVideoComponent;
  let fixture: ComponentFixture<EmbeddedVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbeddedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
