import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-formulario',
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  isLoggedIn: boolean = false;
  predictForm!: FormGroup;
  mensajeError: string = '';
  predictedPrice: number = 0;

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.checkLogin();

    this.predictForm = this.fb.group({

      // NUMÉRICOS
      m2_real: [null, [Validators.required, Validators.min(10)]],
      room_num: [null, [Validators.required, Validators.min(0)]], 
      bath_num: [null, [Validators.required, Validators.min(0)]],
      floor: [0, [Validators.required, Validators.min(0)]],
      ground_size: [0, [Validators.min(0)]],

      // SELECTS
      condition: ['', Validators.required],
      garage: ['', Validators.required],
      loc_city: ['', Validators.required], 
      loc_district: ['', Validators.required], 
      loc_neigh: ['', Validators.required], 
      house_type: ['', Validators.required],

      // CHECKBOXES
      balcony: [false],
      terrace: [false],
      garden: [false],
      unfurnished: [false],
      swimming_pool: [false],
      lift: [false]
    });

  }

  predictPrice(): void {
    console.log('entra')
    if (this.predictForm.invalid) {
      this.mensajeError = 'Formulario invalido';
      return;
    }

    const data = this.predictForm.value;

    this.apiService.predictPrice(data).subscribe({
      next: (res) => {
        if(res) {
          console.log(res)
          this.mensajeError = "";
          this.predictedPrice = res.predicted_price;
        } else {
          this.mensajeError = 'Error al predecir';
        }
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Error en el servidor';
      }
    });
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
