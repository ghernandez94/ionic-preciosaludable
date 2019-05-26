import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss']
})
export class BuscarPage {
  protected textoBuscado: string;
  productos: any = null;

  constructor(
    private productoservice: ProductoService,
    private storage: Storage) {
  }

  buscar() {
    this.productos = null;

    if (this.textoBuscado.length !== 0) {
      this.productoservice
        .buscar(this.textoBuscado)
        .subscribe((data: {}) => {
          this.productos = data;
      });
    }
  }

  clickItem() {
    alert('Item');
  }
}
