export class InscripcionCurso
{
    id :number=0;
    idCurso:number=0;
    idAlumno:number=0;
    calificacionAlumno:number=0;
    fechaInscripcion:Date=new Date();

    constructor(id:number,idCurso:number,idAlumno:number,calificacionAlumno:number,fechaInscripcion:Date)
    {
        this.id=id;       
        this.idCurso=idCurso;
        this.idAlumno=idAlumno;
        this.calificacionAlumno=calificacionAlumno;
        this.fechaInscripcion=fechaInscripcion;
        
    }
}