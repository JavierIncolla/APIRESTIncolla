import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './modules/core/autenticacion/autenticacion/autenticacion.component';
import { LoginComponent } from './modules/core/autenticacion/login/login.component';
import { AuthGuard } from './modules/core/core/auth.guard';
import { GrillaAlumnosComponent } from './modules/feature/alumnos/components/grilla-alumnos/grilla-alumnos.component';
import { GrillaCursosComponent } from './modules/feature/cursos/components/grilla-cursos/grilla-cursos.component';
import { GrillaInscripcionesComponent } from './modules/feature/inscripciones/components/grilla-inscripciones/grilla-inscripciones.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, canActivate: [AuthGuard]
  },

  {
    path: 'autenticacion',
    loadChildren: () => import('./modules/core/autenticacion/autenticacion.module').then(m => m.AutenticacionModule) // lazy loading
  },

  {
    path: 'Alumnos',
    component: GrillaAlumnosComponent
  },
  {
    path: 'Inscripciones',
    component: GrillaInscripcionesComponent
  },
  {
    path: 'Cursos',
    component: GrillaCursosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
