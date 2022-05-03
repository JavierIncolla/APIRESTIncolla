import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly mockapi_URL = 'https://626988bdf2c0cdabac100e2a.mockapi.io/ApiRest/';
  private usuarioLogueado?: Usuario;
  private sesionActiva = false;
  private perfilSession:number=0;

  constructor(private http:HttpClient,private servicioUsuario:UsuarioService,private router: Router) { }
  
  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el frontend:', error.error.message)
    }else{
      console.warn('Error en el backend', error.status, error.message)
    }

    return throwError(() => 'Error de comunicación HTTP');
    
  }

  authUsuario(usuario:string,contrasena:string)
  {
    let lista =this.http.get<Usuario[]>(`${this.mockapi_URL}/usuario`, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }).pipe(catchError(this.manejoError)).subscribe((data)=>{

      
      let user = data.find(x=>x.email==usuario && x.contrasena==contrasena);
      if (user!=null)
      {
        if (user.perfil==1)  //1 => Administrador
        {
          this.usuarioLogueado=user;
          this.setearUsuarioActual(user);
        }
      }
      
    });

  }

  loguearse(usuario:string,contrasena:string)
  {
    this.authUsuario(usuario,contrasena)
  }

  cerrarSesion()
  {
    this.usuarioLogueado = undefined;
    this.perfilSession=0;
    this.sesionActiva=false;
  }
  
  setearUsuarioActual(usuario: Usuario){    
    this.usuarioLogueado = usuario;
    this.perfilSession=usuario.perfil;
    this.sesionActiva=true;
    this.router.navigate(['usuarios']);
  }

  obtenerUsuarioActual(){
    return this.usuarioLogueado;
  }

  obtenerSesionActiva(){
    return this.sesionActiva;
  }
  obtenerRolActivo(){
    return this.perfilSession;
  }
}
