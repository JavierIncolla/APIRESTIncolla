import { Usuario } from './usuario';
import { InscripcionCurso } from './inscripcionCurso';

export class Alumno extends Usuario {
    inscripcion:InscripcionCurso[]=[];   
    
    constructor(id:number,nombre:string,apellido:string,edad:number,ciudad:string,email:string,perfil:number, inscripcion:InscripcionCurso[])
    {
        super(id,nombre,apellido,edad,ciudad,email,perfil);
        this.inscripcion=inscripcion;    
    }
}


 