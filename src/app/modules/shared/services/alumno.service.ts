import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { InscripcionCurso } from '../models/inscripcionCurso';

import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  private readonly mockapi_URL = 'https://626988bdf2c0cdabac100e2a.mockapi.io/ApiRest/';
  private alumnoObservable: Observable<Alumno[]>;
  private alumnoSubject: Subject<Alumno[]>;

  alumnoList: Alumno[] = [
      new Alumno(1,"Pablo","Silva",30,"Buenos Aires","pabloSilva@mail.com",2,[new InscripcionCurso(1,1,1,4,new Date("01/01/2022"))]),
      new Alumno(2,"Jorge","Souza",27,"Quito","jorgeSouza@mail.com",2,[new InscripcionCurso(2,1,2,5,new Date("12/02/2022"))]),
      new Alumno(3,"Pedro","Rodriguez",35,"Salvador","pedroRodriguez@mail.com",2,[new InscripcionCurso(3,2,3,8,new Date("28/01/2021"))]),
      new Alumno(4,"Mario","Baracu",40,"Bogota","marioBaracu@mail.com",2,[new InscripcionCurso(4,3,4,7,new Date("25/04/2022"))]),
      new Alumno(5,"Martin","Fanesi",21,"Brasilia","martinFanesi@mail.com",2,[new InscripcionCurso(5,1,5,4,new Date("18/11/2020"))]),
      new Alumno(6,"Lucas","Cardenas",31,"Lima","lucasCardenas@mail.com",2,[new InscripcionCurso(6,4,6,9,new Date("26/02/2022"))]),
  ];

  constructor(private http:HttpClient) {
    // this.alumnoList=[
    //   new Alumno(1,"Pablo","Silva",30,"Buenos Aires","pabloSilva@mail.com",2,[new InscripcionCurso(1,1,1,4,new Date("01/01/2022"))]),
    //   new Alumno(2,"Jorge","Souza",27,"Quito","jorgeSouza@mail.com",2,[new InscripcionCurso(2,1,2,5,new Date("12/02/2022"))]),
    //   new Alumno(3,"Pedro","Rodriguez",35,"Salvador","pedroRodriguez@mail.com",2,[new InscripcionCurso(3,2,3,8,new Date("28/01/2021"))]),
    //   new Alumno(4,"Mario","Baracu",40,"Bogota","marioBaracu@mail.com",2,[new InscripcionCurso(4,3,4,7,new Date("25/04/2022"))]),
    //   new Alumno(5,"Martin","Fanesi",21,"Brasilia","martinFanesi@mail.com",2,[new InscripcionCurso(5,1,5,4,new Date("18/11/2020"))]),
    //   new Alumno(6,"Lucas","Cardenas",31,"Lima","lucasCardenas@mail.com",2,[new InscripcionCurso(6,4,6,9,new Date("26/02/2022"))]),
    //  ];
    this.alumnoSubject = new Subject();
    this.alumnoObservable = new Observable((observer) => {
      observer.next(this.alumnoList);
    })
   }

   private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }
   
    return throwError(() => 'Error de comunicación HTTP');
    
   }

    getAlumnoObservable(): Observable<any> {
      // return this.alumnoObservable;
      this.alumnoObservable =this.http.get<Alumno[]>(`${this.mockapi_URL}/usuario`, {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
       }).pipe(catchError(this.manejoError));
       return this.alumnoObservable
    }

    getAlumno(id:number) {
      return this.alumnoList.find(Alumno => Alumno.id == id);
    }

    getAllAlumnos() { 
      return this.alumnoList;
    }

    getAlumnoByPerfil(perfilId:number) {
      return this.alumnoList.filter(Alumno => Alumno.perfil == perfilId);
    }


    addAlumno(alum:Alumno) {
      if (alum != undefined) {
        alum.id=this.obtenerSiguienteId()+1;
        this.alumnoList.push(alum);
        this.alumnoSubject.next(this.alumnoList);
      }
    }
    updateAlumno(alum:Alumno){
      if (alum != undefined) {
        this.alumnoList[this.alumnoList.findIndex(x=>x.id==alum.id)]=alum;
        this.alumnoSubject.next(this.alumnoList);
      }
    }
    deleteAlumno(alum:Alumno){
      if (alum != undefined) {
          this.alumnoList.splice(this.alumnoList.findIndex(x=>x.id==alum.id),1); 
          this.alumnoSubject.next(this.alumnoList); 
      }
    }
  
    obtenerSiguienteId():number{
      let max=0;
      for(let i=0;i<this.alumnoList.length;i++){
        if (this.alumnoList[i].id>max)
          max=this.alumnoList[i].id;
      }
      return max;
    }
}
