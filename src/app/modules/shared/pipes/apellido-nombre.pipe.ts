import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'apellidoNombre'
})
export class ApellidoNombrePipe implements PipeTransform {

  transform(value: Usuario, ): string {
    let apellidoNombre:string="";
    if (value!=null)
    {
      if ((value.apellido!=null)&&(value.nombre!=null))
      {
        apellidoNombre=value.apellido+", "+value.nombre;
      }
      
    }
    
    return apellidoNombre;
  }

}
