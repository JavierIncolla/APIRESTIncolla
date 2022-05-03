import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModulePackage } from './material/material.modulePackage';



@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      MaterialModulePackage    
  ],
  exports: [
      MaterialModulePackage
  ]
})
export class CoreModule { }
