
function bienvenida() {
    alert("bienvenido a nuestra tienda " + nombre_cliente + " en que podemos ayudarte")

};

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


let nombre_cliente = prompt("ingrese su nombre");
let cafetera = 12000;
let isla_moderna = 30000;
let sofa_minimal = 13000;
let iva = 1.21;
let opciones;



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
