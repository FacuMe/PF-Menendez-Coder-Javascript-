//Change navbar when scrolled
const brandLogo = document.querySelector('.brand-logo');
const brand = document.querySelector('.brand');
const brandContainer = document.querySelector('.brand-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10 && window.innerWidth > 992) {
        brandLogo.classList.add('navbar-scrolled-logo');
        brand.classList.add('navbar-scrolled-brand');
        brandContainer.classList.add('navbar-scrolled-brand-container');
    } 
    else if (window.scrollY <= 10 || window.innerWidth < 992) {
        brandLogo.classList.remove('navbar-scrolled-logo');
        brand.classList.remove('navbar-scrolled-brand');
        brandContainer.classList.remove('navbar-scrolled-brand-container');
    }
});


// Carga de productos desde archivo JSON (TO DO)
// let listaDeProductos = [];
// document.addEventListener('DOMContentLoaded', () => {
    
//     fetch('products.json')
//         .then(response => response.json())
//         .then(data => {
//             listaDeProductos = data;
//             mostrarTodosLosProductos(listaDeProductos);
//         })
//     .catch(error => console.error('Error al cargar los vinos:', error));
// });

// function mostrarTodosLosProductos(productos) {
//     const productosContainer = document.getElementById('productos-container');
  
//             productos.forEach(producto => {
//                 const productoCard = document.createElement('div');
//                 productoCard.classList.add('col-6', 'col-sm-3', 'd-flex', 'justify-content-center', 'products__block__item');
    
//                 const productoBox = document.createElement('div');
//                 productoBox.classList.add('products__block__item__box');
    
//                 const imageContainer = document.createElement('div');
//                 imageContainer.classList.add('products__block__item__box__image-container');
//                 const image = document.createElement('img');
//                 image.src = producto.imagen; 
//                 image.classList.add('products__block__item__box__image-container__img');
//                 image.alt = producto.nombre;
    
//                 const name = document.createElement('p');
//                 name.classList.add('products__block__item__box__name');
//                 name.textContent = producto.nombre;
    
//                 const title = document.createElement('p');
//                 title.classList.add('products__block__item__box__title');
//                 title.textContent = producto.tipo;
    
//                 const price = document.createElement('p');
//                 price.classList.add('products__block__item__box__price');
//                 price.textContent = producto.precio;
    
//                 const buttonContainer = document.createElement('div');
//                 const button = document.createElement('button');
//                 button.type = 'button';
//                 button.classList.add('btn', 'btn-dark', 'products__block__item__box__btn');
//                 button.textContent = 'Agregar al carrito';
    
//                 imageContainer.appendChild(image);
//                 productoBox.appendChild(imageContainer);
//                 productoBox.appendChild(name);
//                 productoBox.appendChild(title);
//                 productoBox.appendChild(price);
//                 buttonContainer.appendChild(button);
//                 productoBox.appendChild(buttonContainer);
//                 productoCard.appendChild(productoBox);
//                 productosContainer.appendChild(productoCard);
//             });
// }

// Filtro productos (TO DO)
// function filtrarPorTipo(listaDeProductos){
//     let productosFiltradosPorTipo = listaDeProductos.filter(producto => producto.tipo === "Tinto");
//     return productosFiltradosPorTipo;
// }


// function simularCarrito() {
//     let opcionElegida;
//     do{
//         //mostrar carrito
//         if (carrito.estaVacio()){
//             opcionElegida = Number(prompt("Carrito: \n" + carrito.mostrar() + "\n\nIngrese el número de opción para continuar: \n 0. Salir sin comprar. \n 1. Agregar producto al carrito."));
//         }
//         else {
//             opcionElegida = Number(prompt("Carrito: \n" + carrito.mostrar() + "\n\nIngrese el número de opción para continuar: \n 0. Salir sin comprar. \n 1. Agregar producto al carrito. \n 2. Eliminar producto del carrito. \n 3. Vaciar carrito. \n 4. Finalizar compra."));
//         }

//         if (opcionElegida === 1){
//             //elegir producto para comprar
//             let idProducto = Number(prompt("Listado de productos:\n" + controladorP.mostrar() + "\n\nIngrese el ID del producto que desea comprar:"));
//             const producto = controladorP.buscarId(idProducto);
//             let cantidadDeseada = Number(prompt("Ingrese la cantidad que desea"));
//             producto.agregarCantidad(cantidadDeseada);
//             carrito.agregar(producto);
//         }
//         else if(opcionElegida === 2 && !carrito.estaVacio()){
//             //eliminar producto del carrito
//             let idProductoAEliminar = Number(prompt("Carrito: \n" + carrito.mostrar() + "\nIngrese el ID del producto que desea eliminar:"));
//             let cantidadAEliminar = Number(prompt("Ingrese la cantidad que desea eliminar:"));
//             carrito.eliminarProducto(idProductoAEliminar, cantidadAEliminar);
//         }
//         else if(opcionElegida === 3 && !carrito.estaVacio()){
//             //vaciar carrito
//             carrito.vaciar();
//         }
//         else if(opcionElegida === 4 && !carrito.estaVacio()){
//             //finalizar compra
//             let costoEnvio = calcularCostoEnvio();
//             let costoCompra = carrito.calcularTotal();
//             let costoTotal = costoEnvio + costoCompra;
//             alert("El total es de: $" + costoTotal + "\n-Compra: $ " + costoCompra +"\n-Envío: $ " + costoEnvio);
//             carrito.vaciar();
//             break;
//         }
//     }while(opcionElegida != "0")
// }

// const carrito = new Carrito();
// const controladorP = new ProductoController();
// controladorP.cargarDatos();
// const botonSimular = document.getElementById("boton-simular-carrito");
// botonSimular.addEventListener("click", simularCarrito);


// Función para calcular el costo de envío (PRIMERA PREENTREGA)
// function calcularCostoEnvio() {
//     let codigoPostal;
//     let costoEnvio;
    
//     while (isNaN(codigoPostal) || codigoPostal < 1000 || codigoPostal > 2000) {
//         codigoPostal = Number(prompt("Por favor, ingresa tu código postal:"));
//         if (codigoPostal === 0) {
//             return;
//         }
//         else if (isNaN(codigoPostal) || codigoPostal < 1000 || codigoPostal > 2000) {
//             alert("Ingresa un código postal numérico válido (entre 1000-2000, sólo Buenos Aires y CABA)");
//         }
//     }

//     if (codigoPostal >= 1700 && codigoPostal <= 1800) {
//         costoEnvio = 0;
//     } 
//     else if ((codigoPostal >= 1600 && codigoPostal <= 1699) || (codigoPostal >= 1801 && codigoPostal <= 1900)) {
//         costoEnvio = 500;
//     }
//     else {
//         costoEnvio = 800;
//     }

//     alert("El costo de envío para tu zona es $" + costoEnvio + ".");
//     let envioExpress = calcularEnvioExpress(); 
//     let costoFinalEnvio = costoEnvio + envioExpress;
//     return costoFinalEnvio;
// }

// function calcularEnvioExpress () {
//     let valorEnvioExpress;
//     let envioExpress;

//     while (envioExpress !== 1 && envioExpress !== 2) {
//         envioExpress = Number(prompt("¿Quieres envío express? \n (Costo $1.000 adicional) \n Ingresa el número de opción: \n 1. Si. \n 2. No"));
//     }
//     if (envioExpress === 1) {
//         valorEnvioExpress = 1000;
//         return valorEnvioExpress;
//     }
//     else {
//         return 0;
//     }
// }


class Producto{
    constructor(id, nombre, tipo, precio, imagen, stock, cantidadEnCarrito){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidadEnCarrito = cantidadEnCarrito;
    }

    agregarCantidad(cantidadDeseada){
        this.cantidadEnCarrito = this.cantidadEnCarrito + cantidadDeseada;
    }

    restarCantidad(cantidadDeseada){
        this.cantidadEnCarrito = this.cantidadEnCarrito - cantidadDeseada;
    }

    descripcionProducto(){
        return `
        <div class="col-6 col-sm-3 d-flex justify-content-center products__block__item">
            <div class="products__block__item__box">
                <div class="products__block__item__box__image-container">
                    <img src="${this.imagen}" class="products__block__item__box__image-container__img" alt="${this.nombre}">        
                </div>
                <p class="products__block__item__box__name">${this.nombre}</p>
                <p class="products__block__item__box__title">${this.tipo}</p>
                <p class="products__block__item__box__price">$${this.precio}</p>           
                <div>
                    <button type="button" id="ap-${this.id}" class="btn btn-dark products__block__item__box__btn">Agregar al carrito</button>       
                </div>  
            </div>
        </div>`
    }

    descripcionCarrito(){
        return `
        <li>
            <div class="card cart-prod-card">
                <div class="row g-0">
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        <img src="${this.imagen}" class="img-fluid rounded-start cart-prod-img" alt="${this.nombre}">
                    </div>
                    <div class="col-6">
                        <div class="card-body">
                            <h6 class="card-title cart-card-title">${this.nombre}</h6>
                            <p class="card-text cart-card-type"><small class="text-body-secondary">${this.tipo}</small></p>
                            <div class="d-flex gap-3">
                                <p class="card-text cart-card-price">$${this.precio}</p>
                                <div class="cart-card-prod-quantity d-flex">
                                    <button id="minus-prod-cart-btn-${this.id}" class="cart-card-prod-quantity-btn"><i class="fa fa-minus" aria-hidden="true"></i></button>
                                    <p id="prod-cart-quantity-${this.id}" class="cart-card-prod-quantity-input">${this.cantidadEnCarrito}</p>
                                    <button id="plus-prod-cart-btn-${this.id}" class="cart-card-prod-quantity-btn"><i class="fa fa-plus" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <p id="prod-stock-error-${this.id}" class="cart-card-prod-stock-error pt-1">Sólo ${this.stock} en stock</p>
                        </div>
                    </div>
                    <div class="col-3 card-body d-flex justify-content-end">
                        <p class="cart-card-prod-subtotal">$${this.cantidadEnCarrito * this.precio}</p>
                    </div>
                    <div class="col-1 cart-card-prod-delete-icon">
                        <i id="ep-${this.id}" class="fa fa-trash-o" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </li>`
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = [];
    }

    agregar(producto){
        if (producto instanceof Producto) {
            this.listaProductos.push(producto);
        }
    }

    cargarDatos(){
        this.listaProductos = [];
        this.agregar(new Producto(1, "Vino Reserva", "Tinto", 2000, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(2, "Vino Premium", "Blanco", 1800, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(3, "Vino Elegante", "Rosado", 1500, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(4, "Vino Gran Enemigo", "Tinto", 4000, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(5, "Vino Durigutti Cabernet Franc", "Tinto", 3000, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(6, "Vino Durigutti Tempranillo", "Tinto", 3500, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(7, "Vino Chardonnay", "Blanco", 6000, "./img/product1.jpg", 5, 0));
        this.agregar(new Producto(8, "Vino Extra Premium", "Espumante", 8000, "./img/product1.jpg", 5, 0));
    }

    mostrarEnDOM(){
        const productosContainer = document.getElementById("productos-container");
        this.listaProductos.forEach( producto => {
            productosContainer.innerHTML += producto.descripcionProducto();
        });

        this.listaProductos.forEach( producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`);
            btn_ap.addEventListener("click", () => {
                producto.cantidadEnCarrito = 1;
                carrito.agregar(producto);
                carrito.mostrarEnDOM();
            });
        });
    }

    buscarId(id){
        return this.listaProductos.find(producto => producto.id == id);
    }

}

class Carrito{
    constructor(){
        this.listaCarrito = [];
    }

    agregar(productoAlCarrito){
        let existe = this.listaCarrito.some(producto => producto.id == productoAlCarrito.id);
        if(!existe && productoAlCarrito instanceof Producto){
            this.listaCarrito.push(productoAlCarrito);
        }
    }

    estaVacio(){
        return this.listaCarrito.length === 0;
    }

    eliminarProducto(IdProductoAEliminar){
        this.listaCarrito = this.listaCarrito.filter(producto => producto.id !== IdProductoAEliminar);
    }

    vaciar(){
        this.listaCarrito = [];
    }

    calcularTotalProductos(){
        return this.listaCarrito.reduce((total,producto) => total + producto.precio * producto.cantidadEnCarrito, 0);
    }

    mostrarEnDOM(){
        const productosCarritoContainer = document.getElementById("productos-carrito-container");
        const subtotalCarritoContainer = document.getElementById("subtotal-carrito-container");
        const totalCarritoContainer = document.getElementById("total-carrito-container");
        productosCarritoContainer.innerHTML = "";
        subtotalCarritoContainer.innerHTML = "";
        totalCarritoContainer.innerHTML = "";

        if (this.estaVacio()){
            productosCarritoContainer.innerHTML = `
            <li class="empty-cart pt-4">
                <p>El carrito de compras está vacío.<p>
            <li>`;

            subtotalCarritoContainer.innerHTML = "";
        }
        else {
            this.listaCarrito.forEach( producto => {
                productosCarritoContainer.innerHTML += producto.descripcionCarrito();
            });

            this.listaCarrito.forEach( producto => {
                const btn_ep = document.getElementById(`ep-${producto.id}`);
                const btn_plus = document.getElementById(`plus-prod-cart-btn-${producto.id}`);
                const btn_minus = document.getElementById(`minus-prod-cart-btn-${producto.id}`);
                const cartQuantity = document.getElementById(`prod-cart-quantity-${producto.id}`);
                const error = document.getElementById(`prod-stock-error-${producto.id}`);
                btn_ep.addEventListener("click", () => {
                    this.eliminarProducto(producto.id);
                    this.mostrarEnDOM();
                });
                btn_plus.addEventListener("click", () => {
                    if(producto.cantidadEnCarrito + 1 > producto.stock) {
                        producto.cantidadEnCarrito = producto.stock;
                        error.style.visibility = "visible";
                    }
                    else {
                        producto.agregarCantidad(1);
                    }
                    cartQuantity.innerHTML = producto.cantidadEnCarrito;
                    const subtotalCarrito = document.getElementById("subtotal-carrito");
                    subtotalCarrito.innerHTML = `$${this.calcularTotalProductos()}`;
                    const totalCarrito = document.getElementById("total-carrito");
                    totalCarrito.innerHTML = `$${this.calcularTotalProductos()}`;
                });
                btn_minus.addEventListener("click", () => {
                    error.style.visibility = "hidden";
                    if(producto.cantidadEnCarrito - 1 < 1) {
                        producto.cantidadEnCarrito  = 1;
                    }
                    else {
                        producto.restarCantidad(1);
                    }
                    cartQuantity.innerHTML = producto.cantidadEnCarrito;
                    const subtotalCarrito = document.getElementById("subtotal-carrito");
                    subtotalCarrito.innerHTML = `$${this.calcularTotalProductos()}`;
                    const totalCarrito = document.getElementById("total-carrito");
                    totalCarrito.innerHTML = `$${this.calcularTotalProductos()}`;
                });
            });

            subtotalCarritoContainer.innerHTML = `
            <h6>Subtotal (sin envío): </h6>
            <p id="subtotal-carrito">$${this.calcularTotalProductos()}</p>`;

            totalCarritoContainer.innerHTML = `
            <div class="cart-total d-flex justify-content-between align-items-center pe-5 pt-2 pb-2 mt-2 mb-2 me-1">
                <h6>Total: </h6>
                <p id="total-carrito">$${this.calcularTotalProductos()}</p>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <button type="button" class="btn btn-dark cart-btn-final">Finalizar compra</button>
                </div>
                <div>
                    <button type="button" id="empty-cart-btn" class="btn btn-light cart-btn-empty">Vaciar carrito</button>
                </div>
            </div>`;

            const btn_ec = document.getElementById("empty-cart-btn");
            btn_ec.addEventListener("click", () => {
                this.vaciar();
                this.mostrarEnDOM();
            });
        }
    }

}


const carrito = new Carrito();
const controladorP = new ProductoController();
controladorP.cargarDatos();
controladorP.mostrarEnDOM();
carrito.mostrarEnDOM();
