/*


function comprar_decoracion() {

    productos = prompt("cual de nuestros productos le gustaria \n 1: cafetera \n 2: isla_moderna \n 3: sofa_minimal ");
    if (productos === "1") {
        alert("seleccionaste la cafetera")
        productos === cafetera;
    } else if (productos === "2") {
        alert("seleccionaste la isla_moderna")
        productos === isla_moderna;
    } else {
        alert("seleccionaste el sofa_minimal");
    };

    finalizar_compra = prompt("que deseas hacer ahora \n 1: finalizar la compra  \n 2: ver el total");
    if (finalizar_compra == "2") {
        precio_total()
    } else {
        alert("Gracias por su compra")
    };
};

function precio_total() {
    if (productos === "1") {
        alert("este producto cuesta" + cafetera * iva);
    } else if (productos === "2") {
        alert("este producto cuesta" + isla_moderna * iva);
    } else {
        alert("este producto cuesta" + sofa_minimal * iva);
    }
}



let cafetera = 12000;
let isla_moderna = 30000;
let sofa_minimal = 13000;
let iva = 1.21;
let opciones;

console.log(cafetera);

bienvenida();
opciones = prompt(
    "que te gustaria hacer en la pagina \n 1: comprar un producto \n 2: nada solo ver  "
);

while (opciones != "3") {
    if (opciones == "1") {
        comprar_decoracion();
        opciones = "3";
    }
    if (opciones == "2") {
        alert("Esperamos que disfrute nuestra página");
        opciones = "3";
    }
}
*/

function Bienvenida() {
    alert("bienvenido a nuestra tienda " + nombre_cliente + " en que podemos ayudarte");

};

let nombre_cliente = prompt("ingrese su nombre");


function Producto(nombre, detalle, precio) {
    this.nombre = nombre;
    this.detalle = detalle;
    this.precio = precio;
    this.listar = function () {
        return `${this.nombre} - ${this.detalle} - $${this.precio.toFixed(2)}`;
    };
}


const producto1 = new Producto("Sofá Minimal", "Sofá moderno de tres cuerpos disponible en distintos tonos", 1250);
const producto2 = new Producto("Lámpara White", "Lámpara minimalista color blanco", 1730);
const producto3 = new Producto("Cafetera", "Cafetera para expresos con espumador", 2400);
const producto4 = new Producto("Jarrón Doble", "Juego de jarrones decorativos disponibles en negro y blanco", 1150);
const producto5 = new Producto("Silla Otis", "Silla moderna y minimalista ideal para complementar tus espacios", 2430);


const listaProductos = [producto1, producto2, producto3, producto4, producto5];


function seleccionarProductoYCalcularIVA(lista, porcentajeIVA) {

    const opciones = lista.map((producto, index) => `${index + 1}. ${producto.listar()}`).join('\n');


    const seleccion = prompt(`Seleccione un producto ingresando el número correspondiente:\n\n${opciones}`);


    const indiceSeleccionado = parseInt(seleccion) - 1;


    if (indiceSeleccionado >= 0 && indiceSeleccionado < lista.length) {
        const productoSeleccionado = lista[indiceSeleccionado];
        const precioConIVA = productoSeleccionado.precio * (1 + porcentajeIVA);


        alert(`Ha seleccionado: ${productoSeleccionado.nombre}\nPrecio con IVA (21%): $${precioConIVA.toFixed(2)}`);
    } else {
        alert("Selección no válida. Por favor, intente de nuevo.");
    }
}



Bienvenida();

seleccionarProductoYCalcularIVA(listaProductos, 0.21);
