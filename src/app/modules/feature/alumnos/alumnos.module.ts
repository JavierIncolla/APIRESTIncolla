import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModulePackage } from 'src/app/modules/core/core/material/material.modulePackage';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { GrillaAlumnosComponent } from './components/grilla-alumnos/grilla-alumnos.component';



@NgModule({
  declarations: [
    // CrudAlumnoComponent,
    // GrillaAlumnosComponent
  ],
  imports: [
    CommonModule,
    MaterialModulePackage
  ]
})
export class AlumnosModule { }
