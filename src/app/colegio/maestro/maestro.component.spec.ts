import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroComponent } from './maestro.component';

describe('MaestroComponent', () => {
  let component: MaestroComponent;
  let fixture: ComponentFixture<MaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
