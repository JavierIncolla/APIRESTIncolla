import { Curso } from "./curso";

export class Usuario
{
    //cursos:Curso[]=[];
    
    id:number=0;
    nombre:string="sinNomnbre";
    apellido:string="sinApellido";
    edad:number=0;
    ciudad:string="";    
    email: string="";   
    perfil:number=0;

    contrasena:string="asd";

    constructor(id:number,
    nombre:string,
    apellido:string,
    edad:number,
    ciudad:string,
    email:string,
    perfil:number)
    {
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.ciudad=ciudad;
        this.email=email;
        this.perfil=perfil;
    }

    setContrasena(contrasena:string)
    {
        this.contrasena=this.contrasena;
    }
}