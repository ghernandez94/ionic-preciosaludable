import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleprecioService } from 'src/app/services/detalleprecio.service';
import { Detalleprecio } from 'src/app/shared/models/detalleprecio';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  private idProducto: number;
  private idSucursal: number;
  private historial: Array<Detalleprecio>;
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(private activatedRoute: ActivatedRoute,
              private detallePrecioService: DetalleprecioService) {
    this.idProducto = Number(this.activatedRoute.snapshot.paramMap.get('idProducto'));
    this.idSucursal = Number(this.activatedRoute.snapshot.paramMap.get('idSucursal'));
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.detallePrecioService.getHistorial(this.idProducto, this.idSucursal).subscribe((data) => {
      this.historial = data;
      this.showHistory();
    });
  }

  showHistory() {
    const fechas = this.historial.map(dp => {
      const fecha = new Date(dp.fechaHoraDetalle);
      return `${fecha.getDate()}-${fecha.getMonth()}`;
    }
    );

    const precios = this.historial.map(dp =>
      dp.precioFarmaco
    );

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Precio',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: precios,
          }
        ]
      }
    });
  }
}
