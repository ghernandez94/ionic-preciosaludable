import { SucursalService } from './../../services/sucursal.service';
import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { Sucursal } from 'src/app/shared/models/sucursal';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: Map;
  propertyList = [];
  sucursales: any = [];

  constructor(private sucursalService: SucursalService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.map = new Map('map').setView([-33.4427092, -70.6461375], 16);

    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'Precio Saludable'
    }).addTo(this.map);

    this.sucursalService
      .buscarPorCoordenadas(-33.4494826, -70.6461201)
      .subscribe((data: Array<Sucursal>) => {
        this.sucursales = data;
        this.leafletMap();
    });

    // fetch('./assets/data.json').then(res => res.json())
    // .then(json => {
    //   this.propertyList = json.properties;
    //   this.leafletMap();
    // });
  }

  leafletMap() {
    for (const suc of this.sucursales) {
      const bindPopup = `${suc.farmaciaIdFarmaciaNavigation.nombreFarmacia}
        <br>${suc.direccionSucursal},${suc.comunaIdComunaNavigation.nombreComuna}`;

      marker([suc.latitud, suc.longitud]).addTo(this.map)
        .bindPopup(bindPopup)
        .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
