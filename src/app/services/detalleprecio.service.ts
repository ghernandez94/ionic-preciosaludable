import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { PrecioSaludableService } from './preciosaludable.service';
import { Detalleprecio } from '../shared/models/detalleprecio';

@Injectable({
  providedIn: 'root'
})
export class DetalleprecioService extends PrecioSaludableService {
  getHistorial(idProducto: number, idSucursal: number): Observable<Array<Detalleprecio>> {
    return this.http.get<Array<Detalleprecio>>(`${this.endpoint}/api/detalleprecio/historial/${idProducto}/${idSucursal}`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
