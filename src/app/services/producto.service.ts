import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { PrecioSaludableService } from './preciosaludable.service';
import { Producto } from '../shared/models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService extends PrecioSaludableService {

  productos: any = [];
  // Busca por principio activo y nombre comercial
  buscar(textoBuscado: string): Observable<Producto> {
    return this.productos = this.http.get<Producto>(this.endpoint + '/api/producto/Buscar/' + textoBuscado, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}
