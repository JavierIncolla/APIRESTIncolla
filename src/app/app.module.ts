import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';

import { CrudCursoComponent } from './modules/feature/cursos/components/crud-curso/crud-curso.component';
import { CrudAlumnoComponent } from './modules/feature/alumnos/components/crud-alumno/crud-alumno.component';
import { GrillaCursosComponent } from './modules/feature/cursos/components/grilla-cursos/grilla-cursos.component';
import { GrillaAlumnosComponent } from './modules/feature/alumnos/components/grilla-alumnos/grilla-alumnos.component';

import { MaterialModulePackage } from './modules/core/core/material/material.modulePackage';
import { ApellidoNombrePipe } from './modules/shared/pipes/apellido-nombre.pipe';
import { AlumnoService } from './modules/shared/services/alumno.service';
import { CursoService } from './modules/shared/services/curso.service';
import { InscripcionCursoService } from './modules/shared/services/inscripcion-curso.service';
import { CrudInscripcionComponent } from './modules/feature/inscripciones/components/crud-inscripcion/crud-inscripcion.component';
import { GrillaInscripcionesComponent } from './modules/feature/inscripciones/components/grilla-inscripciones/grilla-inscripciones.component';


//import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    RootNavComponent,
    DialogComponent,
    CrudAlumnoComponent,
    GrillaAlumnosComponent,
    GrillaCursosComponent,
    CrudCursoComponent,
    CrudInscripcionComponent,
    GrillaInscripcionesComponent,
    ApellidoNombrePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModulePackage
    //MatInputModule
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule
  ],

  providers: [CursoService,InscripcionCursoService,AlumnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
