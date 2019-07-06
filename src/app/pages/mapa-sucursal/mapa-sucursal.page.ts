import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circleMarker } from 'leaflet';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Sucursal } from 'src/app/shared/models/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-mapa-sucursal',
  templateUrl: './mapa-sucursal.page.html',
  styleUrls: ['./mapa-sucursal.page.scss'],
})
export class MapaSucursalPage implements OnInit {
  myMap: Map;
  propertyList = [];
  idSucursal: number;
  idProducto: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private geolocation: Geolocation,
              private sucursalService: SucursalService) {
    this.idSucursal = Number(this.activatedRoute.snapshot.paramMap.get('idSucursal'));
    this.idProducto = Number(this.activatedRoute.snapshot.paramMap.get('idProducto'));
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
      this.showMap();
  }

  ionViewWillLeave() {
    this.myMap.remove();
  }

  clickHistory() {
    this.router.navigate(['/historial', this.idProducto, this.idSucursal]);
  }

  showMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // Ubicación real
      // const lat = resp.coords.latitude;
      // const lon = resp.coords.longitude;
      // ---------------------------------
      // Ubicación para pruebas
      const lat = -33.441533;
      const lon = -70.647057;

      this.myMap = new Map('map').setView([lat, lon], 16);
      this.myMap.locate({ watch: true });
      tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Precio Saludable' })
        .addTo(this.myMap);

      circleMarker([lat, lon])
        .addTo(this.myMap);

      this.leafletMap();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  leafletMap() {
    this.sucursalService
    .get(this.idSucursal)
    .subscribe((data: Sucursal) => {
      const suc = data;
      const bindPopup = `${suc.farmaciaIdFarmaciaNavigation.nombreFarmacia}
      <br>${suc.direccionSucursal},${suc.comunaIdComunaNavigation.nombreComuna}
      <br><ion-icon name="call"></ion-icon> ${suc.telefonoSucursal}`;

      marker([suc.latitud, suc.longitud])
      .addTo(this.myMap)
      .bindPopup(bindPopup)
      .openPopup();
    });
  }

}
