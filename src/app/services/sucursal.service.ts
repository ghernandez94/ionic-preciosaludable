import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { PrecioSaludableService } from './preciosaludable.service';
import { Sucursal } from '../shared/models/sucursal';


@Injectable({
  providedIn: 'root'
})
export class SucursalService extends PrecioSaludableService {

  get(idSucursal: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(this.endpoint + '/api/sucursal/' + idSucursal, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Busca por principio activo y nombre comercial
  buscarPorCoordenadas(latitud, longitud): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.endpoint +
    '/api/sucursal/ByLocation?latitud=' + latitud + '&longitud=' + longitud , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
