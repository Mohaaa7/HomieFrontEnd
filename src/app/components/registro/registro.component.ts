import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../../services/api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registerForm!: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.mensajeError = 'Por favor completa todos los campos';
      return;
    }

    const {username, password, email} = this.registerForm.value

    this.apiService.register(username, password, email).subscribe({
      next: (res) => {
        if(res) {
          this.mensajeExito = 'Registro exitoso!';
          this.mensajeError = "";
          this.router.navigate(['/login']);
        } else {
          this.mensajeError = 'Registro fallido';
          this.mensajeExito = "";
        }
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Error en el servidor';
      }
    });
  }
}
