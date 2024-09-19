

// Función para cargar los productos desde un archivo JSON
function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => mostrarProductos(data.productos));
}

// Función que muestra los productos en la página con estilo Bootstrap
function mostrarProductos(productos) {
    const productList = document.getElementById('product-list');

    productos.forEach(producto => {
        // Crear la columna para Bootstrap
        const productCol = document.createElement('div');
        productCol.classList.add('col-md-4', 'mb-4'); // Columna de 4 espacios y margen abajo

        // Crear la tarjeta para cada producto
        const productCard = document.createElement('div');
        productCard.classList.add('card', 'h-100'); // Tarjeta con altura completa

        // Añadir imagen (si la necesitas)
        const productImage = document.createElement('img');
        productImage.classList.add('card-img-top');
        productImage.src = 'https://via.placeholder.com/150'; // Imagen temporal

        // Crear el cuerpo de la tarjeta
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Crear el título (nombre del producto)
        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = producto.nombre;

        // Crear el precio del producto
        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.textContent = `Precio: $${producto.precio}`;

        // Crear el botón de agregar al carrito
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al carrito';
        addButton.classList.add('btn', 'btn-primary');

        // Añadir evento al botón para agregar el producto al carrito
        addButton.addEventListener('click', () => agregarAlCarrito(producto));

        // Añadir los elementos al cuerpo de la tarjeta
        cardBody.appendChild(productName);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(addButton);

        // Añadir imagen y cuerpo a la tarjeta
        productCard.appendChild(productImage);
        productCard.appendChild(cardBody);

        // Añadir la tarjeta a la columna
        productCol.appendChild(productCard);

        // Añadir la columna al contenedor de productos
        productList.appendChild(productCol);
    });
}

// Función para agregar el producto al carrito y guardarlo en LocalStorage
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();

    // Añadir el nuevo producto al carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la vista del carrito
    mostrarCarrito();
}

// Función para obtener el carrito desde LocalStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    return total.toFixed(2); // Devolver el total con 2 decimales
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Limpiar la vista antes de mostrar los nuevos elementos

    const carrito = obtenerCarrito();

    carrito.forEach(producto => {
        // Crear un elemento para mostrar el producto en el carrito
        const cartItem = document.createElement('p');
        cartItem.textContent = `${producto.nombre} - $${producto.precio}`;

        // Añadir el producto al carrito en la vista
        cartItems.appendChild(cartItem);
    });

    // Mostrar el total en la vista
    cartTotal.textContent = calcularTotalCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    // Vaciar el carrito en LocalStorage
    localStorage.clear();


}

// Sobrescribir el contenido del carrito para asegurarnos que está vacío en el frontend
function limpiarFrontendCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Limpiar la sección de los productos
    cartItems.innerHTML = '';

    // Resetear el total a 0
    cartTotal.textContent = '0.00';
}

// Añadir evento al botón para vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.clear();
    limpiarFrontendCarrito();
    // Limpiar el frontend
});
// Llamar a la función para cargar los productos al cargar la página
cargarProductos();

// Mostrar el carrito en la página al cargar la página
mostrarCarrito();

