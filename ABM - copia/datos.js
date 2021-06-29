export class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kilometros, potencia){
        super(id,titulo, transaccion, descripcion, precio );
        this.puertas = puertas;
        this.kilometros = kilometros;
        this.potencia = potencia;
    }
}
        /*
export class Anuncio_Auto {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kilometros, potencia){
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.puertas = puertas;
        this.kilometros = kilometros;
        this.potencia = potencia;
    }


}*/