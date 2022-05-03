import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/modules/shared/models/curso';
import { AlumnoService } from 'src/app/modules/shared/services/alumno.service';
import { CursoService } from 'src/app/modules/shared/services/curso.service';

@Component({
  selector: 'app-crud-curso',
  templateUrl: './crud-curso.component.html',
  styleUrls: ['./crud-curso.component.css']
})
export class CrudCursoComponent implements OnInit {

  tituloModal:string="";

  cursoCero : Curso = new Curso(0,"","","",new Date("01/01/2000"));

  formularioCurso: FormGroup = new FormGroup({
    id:new FormControl(''),     
    nombre: new FormControl('Ingrese el nombre del curso', [Validators.required, Validators.minLength(3)]),  
    descripcion: new FormControl('Ingrese descripcion del curso', [Validators.required, Validators.minLength(3)]),
    nombreProfesor: new FormControl('Ingrese el nombre del Profesor', [Validators.required, Validators.minLength(3)]),
    inicio: new FormControl('0', [Validators.required, Validators.nullValidator]),
  });

  soloLectura:boolean=false;

  constructor(private serviceCurso:CursoService, serviceAlumno: AlumnoService,public refDialog: MatDialogRef<CrudCursoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:{datosCurso:Curso, soloLectura:boolean}) {
          if (data.datosCurso.id==0)
          {
              this.tituloModal = "Nuevo Curso";
          }
          else{
                this.tituloModal = "Edición datos del Curso";
          }

          this.cursoCero = data.datosCurso;
          this.soloLectura = data.soloLectura;  
          
    }

    ngOnInit(): void {    
    }


    
    validado()
    {
      if (this.formularioCurso.valid)
      {
        this.refDialog.close(this.cursoCero);              
      }        
    }

}
