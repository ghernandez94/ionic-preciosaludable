import { MapaPage } from './pages/mapa/mapa.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'mapa', component: MapaPage },
  // { path: 'producto', loadChildren: './pages/producto/producto.module#ProductoPageModule' },
  { path: 'producto/:id', loadChildren: './pages/producto/producto.module#ProductoPageModule' },
  { path: 'historial/:idProducto/:idSucursal', loadChildren: './pages/historial/historial.module#HistorialPageModule' },
  { path: 'mapa-sucursal/:idProducto/:idSucursal', loadChildren: './pages/mapa-sucursal/mapa-sucursal.module#MapaSucursalPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
