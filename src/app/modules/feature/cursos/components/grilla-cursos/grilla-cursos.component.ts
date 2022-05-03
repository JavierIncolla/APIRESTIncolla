import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Curso } from 'src/app/modules/shared/models/curso';
import { CursoService } from 'src/app/modules/shared/services/curso.service';
import { CrudCursoComponent } from '../crud-curso/crud-curso.component';

@Component({
  selector: 'app-grilla-cursos',
  templateUrl: './grilla-cursos.component.html',
  styleUrls: ['./grilla-cursos.component.css'],
  providers : [CursoService]
})
export class GrillaCursosComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'nombreProfesor', 'inicio', "acciones"];
  listaCursos: Curso[] = [];  

  dataSource!: any [];  //new MatTableDataSource<Alumno>(this.listaAlumnos);
  constructor(public dialog:MatDialog, public serviceCurso:CursoService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    //this.dataSource.paginator! = this.paginator;
  }

  ngOnInit(): void {

    this.serviceCurso.getCursoObservable().subscribe((datos)=>{
      this.listaCursos = datos;
      this.dataSource = this.listaCursos;
    })
  }


  getAllCursos(){    
      this.listaCursos = this.serviceCurso.getCursos();
  }

  verCurso(curso:Curso){
    const refDialog = this.dialog.open(CrudCursoComponent,{data:{datosCurso: new Curso(curso.id, curso.nombre, curso.descripcion, curso.nombreProfesor, curso.inicio),                                    
                                    soloLectura:true}});

      refDialog.afterClosed().subscribe(result => {
      this.serviceCurso.updateCurso(result);
      this.getAllCursos();

      // this.dataSource.paginator = this.paginator;
      });    
  }

  editarCurso(curso:Curso){
 
    const refDialog=this.dialog.open(CrudCursoComponent,{data:{datosCurso: new Curso(curso.id, curso.nombre, curso.descripcion, curso.nombreProfesor, curso.inicio),
                                                              soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      this.serviceCurso.updateCurso(result)
      this.table.renderRows();
      // this.dataSource.paginator = this.paginator;
    });    
  }

  nuevoCurso()
  {
    const refDialog=this.dialog.open(CrudCursoComponent,{data:{datosCurso: new Curso(0,"","","",new Date("01/01/2020")),                                                          
                                                          soloLectura:false}});

    refDialog.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.serviceCurso.addCurso(result);
        this.table.renderRows();       
      }
      
    });
  }

  eliminarCurso(curso:Curso){

    const refDialog = this.dialog.open(DialogComponent,{data:{titulo:"Eliminar Curso",
     mensaje:"¿Está seguro que desea eliminar el curso " + curso.nombre + ", " + curso.descripcion + "?"}});

    refDialog.afterClosed().subscribe(result => {
      if(result)
      {
        this.serviceCurso.deleteCurso(curso);
        this.table.renderRows();
        //this.dataSource.paginator = this.paginator;  
      }
    });
  }
}
