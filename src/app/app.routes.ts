import { Routes } from '@angular/router';
import { FormularioViviendaComponent } from './components/formulario-vivienda/formulario-vivienda.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'formulario', component: FormularioViviendaComponent},
    { path: 'login', component: LoginComponent}
];
