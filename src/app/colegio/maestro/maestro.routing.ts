import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestroComponent } from "./maestro.component";

const routes: Routes = [
  { path: '', component: MaestroComponent, children: [
    { path: 'dashboard', component: MaestroComponent },
    { path: 'charts', component: MaestroComponent },
    { path: 'tables', component: MaestroComponent },
    { path: 'files', component: MaestroComponent }
  ]},
{ path: 'frutas', component: MaestroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroRoutingModule { }
