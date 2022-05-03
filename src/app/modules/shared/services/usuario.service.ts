import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly mockapi_URL = 'https://626988bdf2c0cdabac100e2a.mockapi.io/ApiRest/';
  private usuarioObservable: Observable<Usuario[]>;
  private usuarioSubject: Subject<Usuario[]>;

  usuarioLista: Usuario[] =[];

  
  constructor(private http:HttpClient) {
    this.usuarioSubject = new Subject();
    this.usuarioObservable = new Observable((observer) => {      
      observer.next(this.usuarioLista);
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

getUsuariosOBS():Observable<any>{

this.usuarioObservable =this.http.get<Usuario[]>(`${this.mockapi_URL}/usuario`, {
 headers: new HttpHeaders({
   'content-type': 'application/json'
 })
}).pipe(catchError(this.manejoError));
return this.usuarioObservable
}






getUsuarios() { 
 this.usuarioSubject.next(this.usuarioLista);
}

getUsuario(id:number) {
 return this.usuarioLista.find(usuario => usuario.id == id);
}
getUsuariosPorRolPromise(perfil:number) {

 let p = new Promise<Usuario[]>((resolve, reject) => {
   const error = false;

   this.http.get<Usuario[]>(`${this.mockapi_URL}/usuario`, {
     headers: new HttpHeaders({
       'content-type': 'application/json'
     })
   })
   .subscribe(
     (data) => {
       console.log("getUsuariosPorRolPromise",data);
       resolve(data.filter(usuario => usuario.perfil == perfil));
       //this.listaCur = data;
     }
   );
 });

 return p;
}

getUsuariosPorRol(perfil:number) {
 let user:Usuario[]=this.usuarioLista.filter(usuario => usuario.perfil != perfil)
 for(var n=0;n<user.length;n++)
 {
     this.deleteUsuarioId(user[n].id);      
 }

 this.usuarioSubject.next(this.usuarioLista);
}


getUsuariosPorRolId(perfil:number){
 return this.usuarioLista.filter(usuario => usuario.perfil == perfil)
}


addUsuario(user:Usuario) {
 if (user!=undefined)
 {
 // al.id=this.obtenerSiguienteId()+1;
 // this.listaUSR.push(al);

    return this.http.post(`${this.mockapi_URL}/usuario`, user);

 //this.usuarioSubject.next(this.listaUSR);
 }
 else
 {
   return null;
 }
}



deleteUsuario(user:Usuario){
 if (user!=undefined)
 {
   return this.http.delete(`${this.mockapi_URL}/usuario/${user.id}`)
 // this.listaUSR.splice(this.listaUSR.findIndex(x=>x.id==al.id),1);
 // this.usuarioSubject.next(this.listaUSR);
 }
 else
 {
   return null;
 }
}
deleteUsuarioId(id:number){
 return this.http.delete(`${this.mockapi_URL}/usuario/${id}`)
 // this.listaUSR.splice(this.listaUSR.findIndex(x=>x.id==id),1);
 // this.usuarioSubject.next(this.listaUSR);
 
}

updateUsuario(user:Usuario){
 if (user!=undefined)
 {   
   return this.http.put(`${this.mockapi_URL}/usuario/${user.id}`, user)
 }
 else
 {
   return null;
 }
}



obtenerSiguienteId():number{
 let max=0;
 for(let i=0;i<this.usuarioLista.length;i++){
   if (this.usuarioLista[i].id>max)
     max=this.usuarioLista[i].id;
 }
 return max;
}
}
