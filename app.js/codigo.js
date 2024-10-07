async function cargarProductos() {
    try {
        const response = await fetch('JSON/productos.json');
        const data = await response.json();
        mostrarProductos(data.productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function mostrarProductos(productos) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    productos.forEach(producto => {
        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'mb-4');

        const productCard = document.createElement('div');
        productCard.classList.add('card', 'h-100');

        const productImage = document.createElement('img');
        productImage.classList.add('card-img-top');
        productImage.src = producto.imagen;

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
    try {
        let carrito = obtenerCarrito();
        const productoExistente = carrito.find(item => item.id === producto.id);

        productoExistente ? productoExistente.cantidad += 1 : (producto.cantidad = 1, carrito.push(producto));

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
    }
}


function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}


function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0).toFixed(2); // Devolver total con 2 decimales
}


function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    const carrito = obtenerCarrito();
    carrito.forEach((producto, index) => {
        const cartItem = document.createElement('p');
        cartItem.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('btn', 'btn-danger', 'ml-2');
        removeButton.addEventListener('click', () => eliminarProductoCarrito(index));

        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = calcularTotalCarrito();
}


function eliminarProductoCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.clear();
    limpiarFrontendCarrito();
}


function limpiarFrontendCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cartTotal.textContent = '0.00';
}

document.getElementById('checkout-button').addEventListener('click', () => {
    $('#checkout-modal').modal('show');
});


document.getElementById('submit-checkout').addEventListener('click', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('name').value.trim();
    const direccion = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const metodoPago = document.getElementById('payment-method').value;

    if (!nombre) {
        swal({
            title: "Oops!",
            text: "Necesitamos tu nombre completo.",
            icon: "warning",
            button: {
                text: "Entendido",
                className: "btn btn-warning"
            },
        });
        return;
    }
    if (!direccion) {
        swal({
            title: "Oops!",
            text: "Por favor, ingresa tu dirección.",
            icon: "warning",
            button: {
                text: "Entendido",
                className: "btn btn-warning"
            },
        });
        return;
    }
    if (!email || !validarEmail(email)) {
        swal({
            title: "Error en el correo",
            text: "El correo proporcionado no es válido. Inténtalo nuevamente.",
            icon: "error",
            button: {
                text: "Reintentar",
                className: "btn btn-danger"
            },
        });
        return;
    }
    if (!metodoPago) {
        swal({
            title: "Método de pago faltante",
            text: "Por favor, selecciona un método de pago antes de proceder.",
            icon: "info",
            button: {
                text: "Seleccionar",
                className: "btn btn-info"
            },
        });
        return;
    }
    swal({
        title: "¡Compra exitosa!",
        text: "Gracias por tu compra. ¡Te esperamos pronto!",
        icon: "success",
        button: {
            text: "Cerrar",
            className: "btn btn-success"
        },
    });

    $('#checkout-modal').modal('hide');

    vaciarCarrito();

    document.getElementById('checkout-form').reset();
});

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById("clear-cart").addEventListener('click', vaciarCarrito);

cargarProductos();
mostrarCarrito();
