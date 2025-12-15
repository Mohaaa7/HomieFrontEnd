import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  isLoggedIn: boolean = false;
  predictForm!: FormGroup;
  mensajeError: string = '';
  predictedPrice: number = 0;
  
  showSaveModal: boolean = false;
  saveName: string = "";

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.checkLogin();

    this.predictForm = this.fb.group({
      m2_real: [null, [Validators.required, Validators.min(10)]],
      room_num: [null, [Validators.required, Validators.min(0)]], 
      bath_num: [null, [Validators.required, Validators.min(0)]],
      floor: [null, [Validators.required]], 
      ground_size: [null, [Validators.min(0)]],
      
      condition: ['', Validators.required],
      garage: ['', Validators.required],
      loc_city: ['', Validators.required], 
      house_type: ['', Validators.required],
      
      balcony: [false],
      terrace: [false],
      garden: [false],
      unfurnished: [false],
      swimming_pool: [false],
      lift: [false]
    });
  }

  predictPrice(): void {
    if (this.predictForm.invalid) {
      this.mensajeError = 'Por favor, rellena todos los campos obligatorios.';
      console.log('faltan datos')
      return;
    }

    const formValues = this.predictForm.value;

    const dataToSend = {
      ...formValues,
      ground_size: formValues.ground_size === null ? 0 : formValues.ground_size,
      room_numbers: formValues.room_num
    };

    this.apiService.predictPrice(dataToSend).subscribe({
      next: (res) => {
        if(res && res.predicted_price) {
          this.mensajeError = "";
          this.predictedPrice = res.predicted_price;
        } else {
          this.mensajeError = 'Error al obtener la predicción.';
        }
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Error de conexión con el servidor.';
      }
    });
  }

  openSaveModal() {
    this.saveName = "";
    this.showSaveModal = true;
  }

  cancelSave() {
    this.showSaveModal = false;
  }

  confirmSave() {
    if (!this.saveName || !this.saveName.trim()) {
      alert("Por favor, ponle un nombre a la vivienda.");
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert("Error: Sesión no válida. Por favor haz login de nuevo.");
      this.showSaveModal = false;
      this.router.navigate(['/login']);
      return;
    }

    const formValues = this.predictForm.value;
    const datosParaGuardar = {
      ...formValues,       
      ground_size: formValues.ground_size === null ? 0 : formValues.ground_size,
      nombre: this.saveName,          
      price: this.predictedPrice,      
      user_id: parseInt(userId)     
    };

    console.log("Enviando datos:", datosParaGuardar); 

    this.apiService.addVivienda(datosParaGuardar).subscribe({
      next: (res) => {
        console.log('Guardado exitoso:', res);
        this.showSaveModal = false;
        alert(`¡Guardado correctamente como "${this.saveName}"!`);
        this.saveName = "";
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        const msg = err.error?.error || 'No se pudo guardar la vivienda.';
        alert("Error: " + msg);
        this.showSaveModal = false;
      }
    });
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}