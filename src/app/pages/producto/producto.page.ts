import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/shared/models/producto';
import { Location } from 'src/app/shared/tools/geolocation/location';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Detalleprecio } from 'src/app/shared/models/detalleprecio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  private idProducto: number;
  private producto: Producto;
  private currentLocation: Location;

  constructor(private route: ActivatedRoute,
              private productoService: ProductoService,
              private geolocation: Geolocation,
              private router: Router) {
    this.idProducto = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.get(this.idProducto).subscribe((data) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // Ubicación real
        // const lat = resp.coords.latitude;
        // const lon = resp.coords.longitude;
        // ---------------------------------
        // Ubicación para pruebas
        const lat = -33.441533;
        const lon = -70.647057;

        this.currentLocation = new Location(-33.441533, -70.647057);
        this.producto = data;
     });
    });
  }

  ngOnInit() { }

  calcularDistancia(lat: number, lon: number) {
    const from = this.currentLocation;
    const to = new Location(lat, lon);
    const distancia = from.GetDistancia(to);
    if (distancia < 1000) {
      return `${Math.trunc(distancia)} m`;
    } else {
      return `${distancia / 100} km.`;
    }
  }

  clickDetallePrecio(dp: Detalleprecio) {
    const idProducto = dp.productoIdProducto;
    const idSucursal = dp.sucursalIdSucursal;
    this.router.navigate(['/mapa-sucursal', idProducto, idSucursal]);
  }
}
