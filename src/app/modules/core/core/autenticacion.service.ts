import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private usuarioActual = {
    nombre: 'Pepe',
    email: 'pepeGrillo@gmail.com',
    perfil: 'Administrador'
  };
  private sesionActiva = true;

  constructor() { }

  obtenerUsuarioActual(){
    return this.usuarioActual;
  }

  obtenerSesionActiva(){
    return this.sesionActiva;
  }
  
}
