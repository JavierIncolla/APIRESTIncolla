import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  listaPerfiles: any[] = [
    {
      id: 1,
      nombre: "Administrador"
    },
    {
      id: 2,
      nombre: "Profesor"      
    },
    {
      id: 3,
      nombre: "Alumno"
    }
   ];

    constructor() { }

    getAllPerfiles() {
      return this.listaPerfiles;
    }

    getPerfilById(id: number) {
      return this.listaPerfiles[this.listaPerfiles.findIndex(x => x.id == id)];
    }
    getPerfilByNombre(nombre:string)
    {
      return this.listaPerfiles[this.listaPerfiles.findIndex(x => x.nombre == nombre)];
    }

}
