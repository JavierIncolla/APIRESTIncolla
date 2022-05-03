import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscripcionCurso } from 'src/app/modules/shared/models/inscripcionCurso';
import { InscripcionCursoService } from 'src/app/modules/shared/services/inscripcion-curso.service';

@Component({
  selector: 'app-crud-inscripcion',
  templateUrl: './crud-inscripcion.component.html',
  styleUrls: ['./crud-inscripcion.component.css']
})
export class CrudInscripcionComponent implements OnInit {

  tituloModal:string="";

  inscripcion : InscripcionCurso = new InscripcionCurso(0,0,0,0,new Date("01/01/2000"));

  formularioInscripcion: FormGroup = new FormGroup({
    id:new FormControl(''),     
    idCurso: new FormControl('Ingrese el número del curso', [Validators.required, Validators.pattern(/^\d+$/)]),  
    idAlumno: new FormControl('Ingrese el número del Alumno', [Validators.required, Validators.pattern(/^\d+$/)]),
    calificacionAlumno: new FormControl('Ingrese la calificación del Alumno', [Validators.required, Validators.pattern(/^\d+$/)]),
    fechaInscripcion: new FormControl(new Date, [Validators.required]),
  });

  soloLectura:boolean=false;

  constructor(private serviceInscripcion:InscripcionCursoService, public refDialog: MatDialogRef<CrudInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{datosIns:InscripcionCurso, soloLectura:boolean}) {
          if (data.datosIns.id==0)
          {
              this.tituloModal = "Nueva Inscripción";
          }
          else{
                this.tituloModal = "Edición datos de la Inscripción";
          }

          this.inscripcion = data.datosIns;
          this.soloLectura = data.soloLectura;  
          
    }

    ngOnInit(): void {    
    }


    
    validado()
    {
      if (this.formularioInscripcion.valid)
      {
        this.refDialog.close(this.inscripcion);              
      }        
    }

}
