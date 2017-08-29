import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from "./nav.component";
import { StudentGuard } from "./../_guards/student.guard";
import { TutorGuard } from "./../_guards/tutor.guard";
import { TeacherGuard } from "./../_guards/teacher.guard";

const routes: Routes = [
  { path: '', redirectTo: 'estudiante', pathMatch: 'full' },
  { path: '', component: NavComponent, children: [
    { path: 'estudiante',loadChildren: 'app/colegio/estudiante/estudiante.module#EstudianteModule', canActivate: [StudentGuard]},
    { path: 'tutor',loadChildren: 'app/colegio/tutor/tutor.module#TutorModule', canActivate: [TutorGuard]},
    { path: 'maestro',loadChildren: 'app/colegio/maestro/maestro.module#MaestroModule', canActivate: [TeacherGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColegioRoutingModule { }
