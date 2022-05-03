import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { InscripcionCurso } from 'src/app/modules/shared/models/inscripcionCurso';
import { InscripcionCursoService } from 'src/app/modules/shared/services/inscripcion-curso.service';
import { CrudInscripcionComponent } from '../crud-inscripcion/crud-inscripcion.component';

@Component({
  selector: 'app-grilla-inscripciones',
  templateUrl: './grilla-inscripciones.component.html',
  styleUrls: ['./grilla-inscripciones.component.css'],
  providers: [InscripcionCursoService]
})
export class GrillaInscripcionesComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'idCurso', 'idAlumno', 'calificacionAlumno', 'fechaInscripcion', "acciones"];
  listaInscripciones: InscripcionCurso[] = [];  

  dataSource! : any []; 
  constructor(public dialog:MatDialog, public serviceInscripcion:InscripcionCursoService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    //this.dataSource.paginator! = this.paginator;
  }

  ngOnInit(): void {
      this.serviceInscripcion.getInscripcionesObservable().subscribe((datos)=>{
      this.listaInscripciones = datos;
      this.dataSource = this.listaInscripciones;
    })
  }


  getAllInscripciones(){    
      this.listaInscripciones = this.serviceInscripcion.getAllInscripciones();
  }

  verInscripcion(inscrip:InscripcionCurso){
    const refDialog = this.dialog.open(CrudInscripcionComponent,{data:{datosIns: new InscripcionCurso(inscrip.id, inscrip.idCurso, inscrip.idAlumno,  inscrip.calificacionAlumno, inscrip.fechaInscripcion),                                    
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
      this.serviceInscripcion.updateInscripcionCurso(result);
      this.getAllInscripciones();

      // this.dataSource.paginator = this.paginator;
      });    
  }

  editarInscripcionCurso(inscrip:InscripcionCurso){
 
    const refDialog=this.dialog.open(CrudInscripcionComponent,{data:{datosIns: new InscripcionCurso(inscrip.id, inscrip.idCurso, inscrip.idAlumno,  inscrip.calificacionAlumno, inscrip.fechaInscripcion),
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      this.serviceInscripcion.updateInscripcionCurso(result)
      this.table.renderRows();
      // this.dataSource.paginator = this.paginator;
    });    
  }

  nuevaInscripcion()
  {
    const refDialog=this.dialog.open(CrudInscripcionComponent,{data:{datosIns: new InscripcionCurso(0,0,0,0,new Date("01/01/2021")),                                                          
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.serviceInscripcion.addInscripcionCurso(result);
        this.table.renderRows();       
      }
      
    });
  }

  eliminarInscripcion(inscrip:InscripcionCurso){

    const refDialog = this.dialog.open(DialogComponent,{data:{titulo:"Eliminar Inscripcion-Curso",
     mensaje:"¿Está seguro que desea eliminar la inscripción número " + inscrip.id + ", con fecha: " + inscrip.fechaInscripcion.toDateString() + "?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.serviceInscripcion.deleteInscripcionCurso(inscrip);
        this.table.renderRows();
        //this.dataSource.paginator = this.paginator;  
      }
    });
  }

}
