import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { GuardadosComponent } from './components/guardados/guardados.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'formulario', component: FormularioComponent},
    { path: 'guardados', component: GuardadosComponent}
];
