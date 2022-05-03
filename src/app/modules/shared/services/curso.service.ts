import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService { 

  private cursoObservable: Observable<Curso[]>;
  private cursoSubject: Subject<Curso[]>;


  cursoList: Curso[] = [
    new Curso(1, "JAVA", "Curso de JAVA", "Profe de JAVA",new Date("12/06/2021")),  
    new Curso(2, "DotNET", "Curso de CSharp","Profe de .Net",new Date("01/8/2021")),
    new Curso(3, "PYTHON", "Curso de Python","Profe de Python",new Date("01/01/2022")),
    new Curso(4, "PHP", "Curso de PHP","Profe de PHP",new Date("09/04/2022")),
    new Curso(5, "ANGULAR", "Curso de Angular","Profe de Angular",new Date("08/25/2021")),
    new Curso(6, "REACT", "Curso de ReactJS","Profe de ReactJS",new Date("07/17/2020")),
  ];
   

  constructor() {
    this.cursoSubject = new Subject();
    this.cursoObservable = new Observable((observer) =>{
      observer.next(this.cursoList);
    })  
  }

  getCursoObservable(): Observable<any> {
    return this.cursoObservable;
  }

  addCurso(curso: Curso) {
    if(curso != undefined) {
          curso.id = this.obtenerSiguienteId() + 1;
          this.cursoList.push(curso);
          this.cursoSubject.next(this.cursoList);
    }
  }    
  updateCurso(curso: Curso) { 
    if (curso != undefined) {
        this.cursoList[this.cursoList.findIndex(x => x.id == curso.id)] = curso;
        this.cursoSubject.next(this.cursoList);
    }
  }
  deleteCurso(curso: Curso) {
    if(curso != undefined) {
        this.cursoList.splice(this.cursoList.findIndex(x => x.id == curso.id), 1);
        this.cursoSubject.next(this.cursoList);
    }
  }
    
  getCurso(id: number) {  
    return this.cursoList.find(c => c.id == id);
  }
  getCursos() {
    return this.cursoList;
  }

  obtenerSiguienteId(): number {
    let max = 0;
    for (let i = 0; i < this.cursoList.length; i++) {
      if (this.cursoList[i].id > max)
        max = this.cursoList[i].id;
    }
    return max;
  }
  
}
