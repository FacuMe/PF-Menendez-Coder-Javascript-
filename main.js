//Change navbar when scrolled
function navbarScrolled() {
    const brandLogo = document.querySelector('.brand-logo');
    const brand = document.querySelector('.brand');
    const brandContainer = document.querySelector('.brand-container');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10 && window.innerWidth > 992) {
            brandLogo.classList.add('navbar-scrolled-logo');
            brand.classList.add('navbar-scrolled-brand');
            brandContainer.classList.add('navbar-scrolled-brand-container');
            backToTopBtn.style.visibility = "visible";
            backToTopBtn.style.opacity = 1;
        } 
        else if (window.scrollY <= 10 || window.innerWidth < 992) {
            brandLogo.classList.remove('navbar-scrolled-logo');
            brand.classList.remove('navbar-scrolled-brand');
            brandContainer.classList.remove('navbar-scrolled-brand-container');
            backToTopBtn.style.visibility = "hidden";
            backToTopBtn.style.opacity = 0;
        }
    });
}

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
                    <button type="button" id="ap-${this.id}" class="btn btn-dark products__block__item__box__btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Agregar al carrito</button>       
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
                        <p id="cart-card-prod-subtotal-${this.id}" class="cart-card-prod-subtotal">$${this.cantidadEnCarrito * this.precio}</p>
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
        this.listaProductos = this.listaProductos;
    }

    agregar(producto){
        if (producto instanceof Producto) {
            this.listaProductos.push(producto);
        }
    }

    cargarDatos(){
        this.listaProductos = [];
        this.agregar(new Producto(1, "Vino Reserva", "Tinto", 2000, "./img/product1.jpg", 1, 0));
        this.agregar(new Producto(2, "Vino Premium", "Blanco", 1800, "./img/product2.jpg", 2, 0));
        this.agregar(new Producto(3, "Vino Elegante", "Rosado", 1500, "./img/product3.jpg", 3, 0));
        this.agregar(new Producto(4, "Vino Gran Enemigo", "Tinto", 4000, "./img/product4.jpg", 4, 0));
        this.agregar(new Producto(5, "Vino Durigutti Cabernet Franc", "Tinto", 3000, "./img/product5.jpg", 5, 0));
        this.agregar(new Producto(6, "Vino Durigutti Tempranillo", "Tinto", 3500, "./img/product1.jpg", 1, 0));
        this.agregar(new Producto(7, "Vino Chardonnay", "Blanco", 6000, "./img/product2.jpg", 2, 0));
        this.agregar(new Producto(8, "Vino Extra Premium", "Espumante", 8000, "./img/product3.jpg", 3, 0));
        this.agregar(new Producto(9, "Vino Termidor Tinto", "Tinto", 3000, "./img/product5.jpg", 5, 0));
        this.agregar(new Producto(10, "Vino Uvita Fiesta", "Tinto", 3500, "./img/product1.jpg", 1, 0));
        this.agregar(new Producto(11, "Vino Concha y Toro", "Blanco", 6000, "./img/product2.jpg", 2, 0));
        this.agregar(new Producto(12, "Vino Pomery", "Espumante", 8000, "./img/product3.jpg", 3, 0));
    }

    mostrarEnDOM(){
        const productosContainer = document.getElementById("productos-container");
        this.listaProductos.forEach( producto => {
            productosContainer.innerHTML += producto.descripcionProducto();
        });

        this.listaProductos.forEach( producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`);
            btn_ap.addEventListener("click", () => {
                carrito.agregar(producto);
                carrito.guardarEnStorage();
                carrito.mostrarEnDOM();
            });
        });

        const goToCartBtn = document.getElementById("go-to-cart-btn");
        const cartToggleBtn = document.getElementById("cart-toggle-btn");
        goToCartBtn.addEventListener("click", () => {
            cartToggleBtn.click();
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
        if (!productoAlCarrito instanceof Producto) {
            return;
        }
        let existe = this.listaCarrito.some(producto => producto.id == productoAlCarrito.id);
        if(!existe){
            productoAlCarrito.cantidadEnCarrito = 1;
            this.listaCarrito.push(productoAlCarrito);
        }
        else{
            let productoYaEnCarrito = this.listaCarrito.find(producto => producto.id == productoAlCarrito.id)
            productoYaEnCarrito.cantidadEnCarrito + 1 <= productoYaEnCarrito.stock && productoYaEnCarrito.agregarCantidad(1);
        }
    }

    verificarStock(producto){
        const error = document.getElementById(`prod-stock-error-${producto.id}`);
        if(producto.cantidadEnCarrito == producto.stock){
            error.style.visibility = "visible";
        }
        else {
            error.style.visibility = "hidden";
        }
    }

    calcularTotalProductos(){
        return this.listaCarrito.reduce((total,producto) => total + producto.precio * producto.cantidadEnCarrito, 0);
    }

    eliminarProducto(IdProductoAEliminar){
        this.listaCarrito = this.listaCarrito.filter(producto => producto.id !== IdProductoAEliminar);
    }

    estaVacio(){
        return this.listaCarrito.length === 0;
    }

    vaciar(){
        this.listaCarrito = [];
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito);
        localStorage.setItem("listaCarrito", listaCarritoJSON);
    }

    recuperarStorage(){
        let listaAux = [];
        let listaCarritoJSON = localStorage.getItem("listaCarrito");
        let listaCarritoJS = JSON.parse(listaCarritoJSON);
        listaCarritoJS.forEach( producto => {
            let nuevoProducto = new Producto(...Object.values(producto));
            listaAux.push(nuevoProducto);
        })
        this.listaCarrito = listaAux;
    }

    cargarProductosDelCarrito(){
        const productosCarritoContainer = document.getElementById("productos-carrito-container");
        this.listaCarrito.forEach( producto => {
            productosCarritoContainer.innerHTML += producto.descripcionCarrito();
        });

        this.listaCarrito.forEach( producto => {
            this.verificarStock(producto);
            this.cargarBotonEliminarProducto(producto);
            this.cargarBotonesCantidadEnCarrito(producto);
        });
    }

    cargarBotonEliminarProducto(producto){
        const btn_ep = document.getElementById(`ep-${producto.id}`);

        btn_ep.addEventListener("click", () => {
            this.eliminarProducto(producto.id);
            this.guardarEnStorage();
            this.mostrarEnDOM();
        });
    }

    cargarBotonesCantidadEnCarrito(producto){
        const btn_plus = document.getElementById(`plus-prod-cart-btn-${producto.id}`);
        const btn_minus = document.getElementById(`minus-prod-cart-btn-${producto.id}`);
        const cartQuantity = document.getElementById(`prod-cart-quantity-${producto.id}`);

        btn_plus.addEventListener("click", () => {
            if (producto.cantidadEnCarrito < producto.stock) {
                producto.agregarCantidad(1);
                this.guardarEnStorage();
            }
            this.mostrarEnDOM();
        });

        btn_minus.addEventListener("click", () => {
            if (producto.cantidadEnCarrito > 1) {
                producto.restarCantidad(1);
                this.guardarEnStorage();
            }
            this.mostrarEnDOM();
        });

        cartQuantity.innerHTML = producto.cantidadEnCarrito;
        this.verificarStock(producto);
    }

    cargarSubtotalProductos(){
        const subtotalCarritoContainer = document.getElementById("subtotal-carrito-container");
        subtotalCarritoContainer.innerHTML = `
            <h6>Subtotal (sin envío): </h6>
            <p id="subtotal-carrito">$${this.calcularTotalProductos()}</p>`;
    }

    cargarTotalFinalizarYVaciar(){
        const totalCarritoContainer = document.getElementById("total-carrito-container");
        totalCarritoContainer.innerHTML = `
            <div class="cart-total d-flex justify-content-between align-items-center pe-5 pt-2 pb-2 mt-2 mb-2">
                <h6>Total: </h6>
                <p id="total-carrito">$${this.calcularTotalProductos()}</p>
            </div>
            <div class="d-flex justify-content-between pe-3">
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
            this.guardarEnStorage();
            this.mostrarEnDOM();
        });
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
            <div class="empty-cart pt-4">
                <p>El carrito de compras está vacío.<p>
            </div>`;
        }
        else {
            this.cargarProductosDelCarrito();
            this.cargarSubtotalProductos();
            this.cargarTotalFinalizarYVaciar();
        }
    }

}

navbarScrolled();
const carrito = new Carrito();
const controladorP = new ProductoController();
controladorP.cargarDatos();
controladorP.mostrarEnDOM();
carrito.recuperarStorage();
carrito.mostrarEnDOM();
