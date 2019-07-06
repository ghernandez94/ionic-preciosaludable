import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Storage } from '@ionic/storage';
import { Producto } from '../shared/models/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss']
})
export class BuscarPage implements OnInit {
  protected textoBuscado: string;
  protected productos: Array<Producto> = null;
  protected busquedasRecientes: Array<Producto>;

  constructor(
    private productoservice: ProductoService,
    private storage: Storage,
    private router: Router) {
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
        .subscribe((data) => {
          this.productos = data;
      });
    }
  }

  clickItemBuscado(obj: object) {
    const producto = new Producto(obj);
    const idProducto = producto.idProducto;
    this.addReciente(producto);
    this.router.navigate(['/producto', idProducto]);
  }

  // Lógica de búsquedas recientes
  clickReciente(obj: object) {
    const producto: Producto = new Producto(obj);
    const idProducto = producto.idProducto;
    this.router.navigate(['/producto', idProducto]);
  }

  addReciente(prd: Producto) {
    if (this.productoIndexOf(this.busquedasRecientes, prd) === -1) {
      this.busquedasRecientes.push(prd);
      this.storage.set('busquedasRecientes', this.busquedasRecientes);
    }
  }

  removeReciente(obj: object) {
    const index = this.productoIndexOf(this.busquedasRecientes, new Producto(obj));
    this.busquedasRecientes.splice(index, 1);
    this.storage.set('busquedasRecientes', this.busquedasRecientes);
  }

  productoIndexOf(arr: Array<Producto>, search: Producto) {
    return arr.findIndex  (producto => {
      return producto.idProducto === search.idProducto;
    });
  }
}
