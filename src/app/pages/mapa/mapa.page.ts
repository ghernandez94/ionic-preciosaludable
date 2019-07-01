import { SucursalService } from './../../services/sucursal.service';
import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circleMarker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Sucursal } from 'src/app/shared/models/sucursal';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: Map;
  propertyList = [];
  sucursales: Array<Sucursal>;

  constructor(private sucursalService: SucursalService,
              private geolocation: Geolocation) { }

  ngOnInit() { }

  ionViewDidEnter() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // const lat = resp.coords.latitude;
      // const lon = resp.coords.longitude;
      const lat = -33.441533;
      const lon = -70.647057;

      this.map = new Map('map').setView([lat, lon], 16);
      this.map.locate({watch: true});
      tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {attribution: 'Precio Saludable'})
          .addTo(this.map);

      circleMarker([lat, lon])
        .addTo(this.map);

      this.sucursalService
        .buscarPorCoordenadas(lat, lon)
        .subscribe((data: Array<Sucursal>) => {
          this.sucursales = data;
          this.leafletMap();
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  leafletMap() {
    for (const suc of this.sucursales) {
      const bindPopup = `${suc.farmaciaIdFarmaciaNavigation.nombreFarmacia}
        <br>${suc.direccionSucursal},${suc.comunaIdComunaNavigation.nombreComuna}
        <br><ion-icon name="call"></ion-icon> ${suc.telefonoSucursal}`;

      marker([suc.latitud, suc.longitud])
        .addTo(this.map)
        .bindPopup(bindPopup);
        // .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
