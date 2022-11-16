import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnyaComponent } from './onya.component';

describe('OnyaComponent', () => {
  let component: OnyaComponent;
  let fixture: ComponentFixture<OnyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
