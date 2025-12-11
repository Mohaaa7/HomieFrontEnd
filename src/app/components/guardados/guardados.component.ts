import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-guardados',
  imports: [RouterLink],
  templateUrl: './guardados.component.html',
  styleUrl: './guardados.component.css'
})
export class GuardadosComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }
}
