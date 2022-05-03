import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
//import {MatPaginator} from '@angular/material/paginator';
//import {MatTable} from '@angular/material/table';
//import { MatDialog } from '@angular/material/dialog';
import { CrudAlumnoComponent } from '../crud-alumno/crud-alumno.component';

import { AlumnoService } from 'src/app/modules/shared/services/alumno.service';
import { Alumno } from 'src/app/modules/shared/models/alumno';
import { InscripcionCurso } from 'src/app/modules/shared/models/inscripcionCurso';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';


@Component({
  selector: 'app-grilla-alumnos',
  templateUrl: './grilla-alumnos.component.html',
  styleUrls: ['./grilla-alumnos.component.css'],
  providers: [AlumnoService]
})
export class GrillaAlumnosComponent implements OnInit , AfterViewInit {

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'ciudad', 'email', "acciones"];
  listaAlumnos: Alumno[] = [];  

  dataSource!: any [];  //new MatTableDataSource<Alumno>(this.listaAlumnos);
  constructor(public dialog:MatDialog, public serviceAlumno:AlumnoService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    //this.dataSource.paginator! = this.paginator;
  }

  ngOnInit(): void {

    this.serviceAlumno.getAlumnoObservable().subscribe((datos)=>{
      this.listaAlumnos = datos;
      this.dataSource = this.listaAlumnos;
    })
  }


  getAllAlumnos(){    
      this.listaAlumnos = this.serviceAlumno.getAllAlumnos();
  }

  verAlumno(alum:Alumno){
    const refDialog = this.dialog.open(CrudAlumnoComponent,{data:{datosAlum: new Alumno(alum.id, alum.nombre, alum.apellido, alum.edad, alum.ciudad, alum.email, alum.perfil, alum.inscripcion),                                    
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
      this.serviceAlumno.updateAlumno(result);
      this.getAllAlumnos();

      // this.dataSource.paginator = this.paginator;
      });    
  }

  editarAlumno(alum:Alumno){
 
    const refDialog=this.dialog.open(CrudAlumnoComponent,{data:{datosAlum: new Alumno(alum.id, alum.nombre, alum.apellido, alum.edad, alum.ciudad, alum.email,alum.perfil, alum.inscripcion),
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      this.serviceAlumno.updateAlumno(result)
      this.table.renderRows();
      // this.dataSource.paginator = this.paginator;
    });    
  }

  nuevoAlumno()
  {
    const refDialog=this.dialog.open(CrudAlumnoComponent,{data:{datosAlum: new Alumno(0,"","",0,"","",3, [new InscripcionCurso(1,1,1,4,new Date("01/01/2000"))]),
                                                          
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
      this.serviceAlumno.addAlumno(result);
        this.table.renderRows();
       
      }
      
    });

  }
  eliminarAlumno(alum:Alumno){

    const refDialog = this.dialog.open(DialogComponent,{data:{titulo:"Eliminar Alumno",
     mensaje:"¿Está seguro que desea eliminar el alumno " + alum.nombre + ", " + alum.apellido + "?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.serviceAlumno.deleteAlumno(alum);
        this.table.renderRows();
        // this.dataSource.paginator = this.paginator;  
      }
    });
  }
}
