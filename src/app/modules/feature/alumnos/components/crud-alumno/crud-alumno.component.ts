import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/app/modules/shared/models/alumno';
import { InscripcionCurso } from 'src/app/modules/shared/models/inscripcionCurso';
import { CursoService } from 'src/app/modules/shared/services/curso.service';
import { AlumnoService } from 'src/app/modules/shared/services/alumno.service';
import { Curso } from 'src/app/modules/shared/models/curso';


@Component({
  selector: 'app-crud-alumno',
  templateUrl: './crud-alumno.component.html',
  styleUrls: ['./crud-alumno.component.css']
})
export class CrudAlumnoComponent implements OnInit {

  tituloModal:string="";

  formularioAlumno: FormGroup = new FormGroup({
    id:new FormControl(''),
    nombre: new FormControl('Ingrese su nombre', [Validators.required, Validators.minLength(3)]),  
    apellido: new FormControl('Ingrese su apellido', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('Ingrese su email', [Validators.required, Validators.email]),
    edad: new FormControl('0', [Validators.required, Validators.pattern(/^\d+$/)]),
    ciudad: new FormControl('Ingrese su ciudad', [Validators.required, Validators.minLength(3)]),
  });

  soloLectura:boolean=false;
  todosLosCursos:Curso[]=[];

  alumno:Alumno=new Alumno(0,"","",0,"","",3, [new InscripcionCurso(1,1,1,4,new Date("01/01/2000"))]);    

  

  constructor(private serviceCurso:CursoService, serviceAlumno: AlumnoService,public refDialog: MatDialogRef<CrudAlumnoComponent>, 
                              @Inject(MAT_DIALOG_DATA) public data:{datosAlum:Alumno,soloLectura:boolean}) {
    if (data.datosAlum.id==0)
    {
      this.tituloModal = "Nuevo Alumno";
    }
    else{
        this.tituloModal = "Edición datos del Alumno";
    }

      this.alumno = data.datosAlum;
      this.soloLectura = data.soloLectura;
      //this.perfil = data.perfiles;
      this.todosLosCursos = this.serviceCurso.getCursos();
    }

    ngOnInit(): void {    
    }

    // agregarCurso(){
    //   let curso = this.serviceCurso.getCurso(this.formularioAlumno.value.cursos);
    //   this.serviceAlumno.agregarCurso(this.alumno,curso);
    // }
    // quitarCurso(alumnoId:number,cursoId:number){

    // this.servicioUsuario.desasignarCurso(this.usuario,this.servicioCursos.getCurso(cursoId)!);

    //}

    validado()
    {
        if (this.formularioAlumno.valid)
        {
          this.refDialog.close(this.alumno);              
        }        
    }
}
