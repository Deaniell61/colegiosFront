import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from "./estudiante.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CursosComponent } from "./cursos/cursos.component";
import { CursoDetalleComponent } from "./curso-detalle/curso-detalle.component";
import { ProfileComponent } from './../admin/profile/profile.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },    
  { path: '', component: EstudianteComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cursos/:op', component: CursosComponent },
    { path: 'curso-detalle/:id/:name', component: CursoDetalleComponent },
    { path: 'notas', component: CursoDetalleComponent },
    { path: 'profile', component: ProfileComponent },
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
