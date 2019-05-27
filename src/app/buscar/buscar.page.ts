import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Storage } from '@ionic/storage';
import { Producto } from '../shared/models/producto';

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss']
})
export class BuscarPage implements OnInit {
  protected textoBuscado: string;
  protected productos: any = null;
  protected busquedasRecientes: Array<Producto>;

  constructor(
    private productoservice: ProductoService,
    private storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('busquedasRecientes').then((val) => {
      if (val !== null) {
        this.busquedasRecientes = val;
      } else {
        this.busquedasRecientes = new Array<Producto>();
      }
    });
  }

  buscar() {
    this.productos = null;

    if (this.textoBuscado.trim().length !== 0) {
      this.productoservice
        .buscar(this.textoBuscado)
        .subscribe((data: {}) => {
          this.productos = data;
      });
    }
  }

  clickItem(prd: any) {
    const producto = new Producto(prd);
    if (this.deepIndexOf(this.busquedasRecientes, producto) === -1) {
      this.busquedasRecientes.push(producto);
    }
  }


  // Malo
  deepIndexOf(arr, obj) {
    return arr.findIndex  (cur => {
      return Object.keys(obj).every((key => {
        return obj[key] === cur[key];
      }));
    });
  }
}
