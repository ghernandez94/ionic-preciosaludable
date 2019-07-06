import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapaSucursalPage } from './mapa-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: MapaSucursalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapaSucursalPage]
})
export class MapaSucursalPageModule {}
