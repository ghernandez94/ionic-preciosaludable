import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/shared/models/producto';
import { Detalleprecio } from 'src/app/shared/models/detalleprecio';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  private idProducto: number;
  private producto: Producto;

  constructor(private route: ActivatedRoute, private productoService: ProductoService) {
    this.idProducto = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.get(this.idProducto).subscribe((data) => {
      this.producto = data;
    });

  }

  ngOnInit() {  }

}
