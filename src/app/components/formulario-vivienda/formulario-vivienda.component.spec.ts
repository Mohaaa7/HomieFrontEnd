import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioViviendaComponent } from './formulario-vivienda.component';

describe('FormularioViviendaComponent', () => {
  let component: FormularioViviendaComponent;
  let fixture: ComponentFixture<FormularioViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioViviendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
