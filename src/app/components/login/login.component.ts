import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  mensaje = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.mensaje = 'Por favor completa todos los campos';
      return;
    }

    const {username, password} = this.loginForm.value

    this.apiService.login(username, password).subscribe({
      next: (res) => {
        if(res.success) {
          this.mensaje = 'Login exitoso!';
          localStorage.setItem('token', res.token!);
        } else {
          this.mensaje = res.mensaje || 'Login fallido';
        }
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al conectar con el servidor';
      }
    });
  }


}
