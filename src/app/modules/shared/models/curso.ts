export class Curso {
     id: number = 0;
     nombre: string = "";
     descripcion: string = ""; 
     nombreProfesor: string = "";
     inicio: Date = new Date();

    constructor(id: number, nombre: string, descripcion: string, nombreProfesor: string, inicio: Date) {        
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.nombreProfesor = nombreProfesor;
        this.inicio = inicio;
    }    
}