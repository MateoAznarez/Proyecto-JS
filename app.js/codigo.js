


function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => mostrarProductos(data.productos));
}


function mostrarProductos(productos) {
    const productList = document.getElementById('product-list');

    productos.forEach(producto => {

        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'mb-4');


        const productCard = document.createElement('div');
        productCard.classList.add('card', 'h-100');


        const productImage = document.createElement('img');
        productImage.classList.add('card-img-top');
        productImage.src = 'https://via.placeholder.com/150';


        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');


        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = producto.nombre;


        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.textContent = `Precio: $${producto.precio}`;


        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al carrito';
        addButton.classList.add('btn', 'btn-primary');

        addButton.addEventListener('click', () => agregarAlCarrito(producto));

        cardBody.appendChild(productName);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(addButton);


        productCard.appendChild(productImage);
        productCard.appendChild(cardBody);


        productCol.appendChild(productCard);


        productList.appendChild(productCol);
    });
}


function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();


    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));


    mostrarCarrito();
}


function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}


function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    return total.toFixed(2);
}


function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    const carrito = obtenerCarrito();

    carrito.forEach(producto => {

        const cartItem = document.createElement('p');
        cartItem.textContent = `${producto.nombre} - $${producto.precio}`;

        cartItems.appendChild(cartItem);
    });


    cartTotal.textContent = calcularTotalCarrito();
}


function vaciarCarrito() {

    localStorage.clear();


}


function limpiarFrontendCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';


    cartTotal.textContent = '0.00';
}


document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.clear();
    limpiarFrontendCarrito();

});

cargarProductos();


mostrarCarrito();

