// Función para cargar los productos desde un archivo JSON utilizando async/await
async function cargarProductos() {
    try {
        const response = await fetch('JSON/productos.json');
        const data = await response.json();
        mostrarProductos(data.productos);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función que muestra los productos en la página con estilo Bootstrap
function mostrarProductos(productos) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar lista de productos antes de mostrar los nuevos

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

// Modificar la función para manejar productos duplicados incrementando la cantidad
function agregarAlCarrito(producto) {
    try {
        let carrito = obtenerCarrito();
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1; // Incrementar cantidad si el producto ya existe
        } else {
            producto.cantidad = 1; // Inicializar cantidad si es un producto nuevo
            carrito.push(producto); // Añadir producto al carrito
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(); // Actualizar vista del carrito
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
    }
}

// Función para obtener el carrito desde LocalStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0).toFixed(2); // Devolver total con 2 decimales
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Limpiar vista del carrito

    const carrito = obtenerCarrito();
    carrito.forEach((producto, index) => {
        const cartItem = document.createElement('p');
        cartItem.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

        // Botón para eliminar el producto
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('btn', 'btn-danger', 'ml-2');
        removeButton.addEventListener('click', () => eliminarProductoCarrito(index));

        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = calcularTotalCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProductoCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1); // Eliminar producto según el índice
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar vista del carrito
}

// Función para vaciar el carrito y limpiar la vista
function vaciarCarrito() {
    localStorage.clear(); // Limpiar LocalStorage
    limpiarFrontendCarrito(); // Limpiar el frontend
}

// Función para limpiar el frontend del carrito
function limpiarFrontendCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cartTotal.textContent = '0.00'; // Resetear total a 0
}

// Mostrar el modal de checkout al hacer clic en el botón "Finalizar Compra"
document.getElementById('checkout-button').addEventListener('click', () => {
    $('#checkout-modal').modal('show'); // Usamos el modal de Bootstrap
});

// Validaciones de formulario y envío de datos
document.getElementById('submit-checkout').addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir recarga de página

    // Obtener valores del formulario
    const nombre = document.getElementById('name').value.trim();
    const direccion = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const metodoPago = document.getElementById('payment-method').value;

    // Validaciones básicas (programación defensiva)
    if (!nombre) {
        alert('Por favor, ingrese su nombre completo.');
        return;
    }
    if (!direccion) {
        alert('Por favor, ingrese su dirección.');
        return;
    }
    if (!email || !validarEmail(email)) {
        alert('Por favor, ingrese un email válido.');
        return;
    }
    if (!metodoPago) {
        alert('Por favor, seleccione un método de pago.');
        return;
    }

    // Si todas las validaciones pasan, mostramos un mensaje de éxito
    swal({
        title: "¡Compra finalizada!",
        text: "Gracias por tu compra. ¡Esperamos verte pronto!",
        icon: "success",
        button: "Cerrar",
    });
    // Ocultar el modal
    $('#checkout-modal').modal('hide');

    // Vaciar el carrito y limpiar localStorage
    vaciarCarrito();

    // Reiniciar el formulario
    document.getElementById('checkout-form').reset();
});

// Función para validar un email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Añadir evento al botón para vaciar el carrito
document.getElementById("clear-cart").addEventListener('click', vaciarCarrito); // Cambié aquí

// Cargar los productos y mostrar el carrito al cargar la página
cargarProductos();
mostrarCarrito();
