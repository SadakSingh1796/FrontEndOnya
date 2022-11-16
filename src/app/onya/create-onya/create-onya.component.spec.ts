import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnyaComponent } from './create-onya.component';

describe('CreateOnyaComponent', () => {
  let component: CreateOnyaComponent;
  let fixture: ComponentFixture<CreateOnyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOnyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOnyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
