export class Location {
    private RADIO_TIERRA = 6371;
    private latitud: number;
    private longitud: number;

    constructor(latitud: number, longitud: number) {
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public GetDistancia(location: this): number {
        let distancia = 0;
        try {
            const tmpLatitud: number = (location.latitud - this.latitud) * (Math.PI / 180);
            const tmpLongitud: number = (location.longitud - this.longitud) * (Math.PI / 180);
            const a: number = Math.sin(tmpLatitud / 2)
                * Math.sin(tmpLatitud / 2)
                + Math.cos(this.latitud * (Math.PI / 180))
                * Math.cos(location.latitud * (Math.PI / 180))
                * Math.sin(tmpLongitud / 2) * Math.sin(tmpLongitud / 2);
            const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            distancia = (this.RADIO_TIERRA * c) * 1000;
        } catch (Exception) {
            distancia = -1;
        }
        return Math.round(distancia * 100) / 100;
    }
}
