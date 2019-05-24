import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss']
})
export class BuscarPage {
  protected textoBuscado: string;
  productos: any = [];

  constructor(private productoservice: ProductoService) {
  }

  buscar() {
    this.productos = [];

    if (this.textoBuscado.length !== 0) {
      this.productoservice
        .buscar(this.textoBuscado)
        .subscribe((data: {}) => {
          this.productos = data;
      });
    }

    console.log(this.productos);
  }
}
