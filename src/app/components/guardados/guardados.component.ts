import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guardados',
  imports: [RouterLink, CommonModule],
  templateUrl: './guardados.component.html',
  styleUrl: './guardados.component.css'
})
export class GuardadosComponent {
  isLoggedIn: boolean = false;
  listaGuardados: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.showGuardados();
    this.checkLogin();
  }

  showGuardados() {
    const user_id = Number(localStorage.getItem('user_id'));

    if (!user_id) {
        this.router.navigate(['/login']);
        return;
    }

    this.apiService.showViviendas(user_id).subscribe({
      next: (res: any) => {
        this.listaGuardados = res.guardados; 
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  deleteVivienda(id: number) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta vivienda de tus guardados?')) {
      return;
    }

    this.apiService.deleteVivienda(id).subscribe({
      next: (res: any) => {
        console.log('Vivienda eliminada: ', res)
        this.listaGuardados = this.listaGuardados.filter(casa => casa.id_vivienda !== id);
      },
      error: (err) => {
        console.error('Error:', err);
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
    this.router.navigate(['/login']);
  }
}
