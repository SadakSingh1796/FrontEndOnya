import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCusDocumentComponent } from './dialog-cus-document.component';

describe('DialogCusDocumentComponent', () => {
  let component: DialogCusDocumentComponent;
  let fixture: ComponentFixture<DialogCusDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCusDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCusDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
