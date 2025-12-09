import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  mensajeExito = '';
  mensajeError = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.mensajeError = 'Por favor completa todos los campos';
      return;
    }

    const {username, password} = this.loginForm.value

    this.apiService.login(username, password).subscribe({
      next: (res) => {
        if(res) {
          this.mensajeExito = 'Login exitoso!';
          localStorage.setItem('token', res.access_token!);
          this.mensajeError = "";
          
          this.router.navigate(['/']);
        } else {
          this.mensajeError = 'Login fallido';
          this.mensajeExito = "";
        }
      },
      error: (err) => {
        this.mensajeExito = '';
        console.error(err);
        if (err.status > 0) {
          this.mensajeError = 'Credenciales inválidas'; 
        } else {
          this.mensajeError = 'Error al conectar con el servidor.';
        }
      }
    });
  }


}
