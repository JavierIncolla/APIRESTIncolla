import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  titulo:string="";
  mensaje:string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public refDialog: MatDialogRef<DialogComponent>) {
    this.titulo=data.titulo;
    this.mensaje=data.mensaje;
   } 

  ngOnInit(): void {
  }

  aceptar()
  {
    this.refDialog.close(true);
  }
  cancelar()
  {
    this.refDialog.close(false);
  }
}
