//Cambiar navbar al hacer scroll
function pageScrolled(){
    const brandLogo = document.querySelector('.brand-logo');
    const brand = document.querySelector('.brand');
    const brandContainer = document.querySelector('.brand-container');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            backToTopBtn.style.visibility = "visible";
            backToTopBtn.style.opacity = 1;
            if (window.innerWidth > 992){
                brandLogo.classList.add('navbar-scrolled-logo');
                brand.classList.add('navbar-scrolled-brand');
                brandContainer.classList.add('navbar-scrolled-brand-container');
            }
        } 
        else {
            backToTopBtn.style.visibility = "hidden";
            backToTopBtn.style.opacity = 0;
            brandLogo.classList.remove('navbar-scrolled-logo');
            brand.classList.remove('navbar-scrolled-brand');
            brandContainer.classList.remove('navbar-scrolled-brand-container');
        }
    });
}

//Cambiar enfoque en inputs de formulario de compra
function paymentCard(){
    const tarjetaInputs = document.querySelectorAll('.payment-card-inputs');
    for (let i = 0; i < tarjetaInputs.length; i++) {
        tarjetaInputs[i].addEventListener('input', () => {
            if(tarjetaInputs[i+1]){
                tarjetaInputs[i].value.length === tarjetaInputs[i].maxLength && tarjetaInputs[i + 1].focus();
            }
        });
    }
}

// Carga de productos y carrito
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
                        <i id="delete-cart-item-update-${this.id}" class="fa fa-history" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </li>`
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = [];
        this.listaFiltrada = [];
    }

    agregar(producto){
        if (producto instanceof Producto) {
            this.listaProductos.push(producto);
        }
    }

    cargarDatos(){
        fetch('products.json')
            .then(response => response.json())
            .then(response => {
                response.forEach(producto => {
                    let nuevoProducto = new Producto(...Object.values(producto));
                    this.agregar(nuevoProducto);
                });
                this.listaFiltrada = this.listaProductos;
                this.mostrarEnDOM();
            })
        .catch(error => console.error('Error al cargar productos', error));
    }

    buscarId(id){
        return this.listaProductos.find(producto => producto.id == id);
    }

    ordenarProductos(orden){
        if(orden === "nombre-AZ"){
            return this.listaFiltrada.sort((a, b) => {
                if(a.nombre > b.nombre){
                    return 1;
                }
                if(a.nombre < b.nombre){
                    return -1;
                }
                return 0;
            });
        }
        else if(orden === "nombre-ZA"){
            return this.listaFiltrada.sort((a, b) => {
                if(a.nombre > b.nombre){
                    return -1;
                }
                if(a.nombre < b.nombre){
                    return 1;
                }
                return 0;
            });
        }
        else if(orden === "precio-ascendente"){
            return this.listaFiltrada.sort((a, b) => a.precio - b.precio);
        }
        else if(orden === "precio-descendente"){
            return this.listaFiltrada.sort((a, b) => b.precio - a.precio);
        }
    }

    filtrarPorNombre(nombre){
        return this.listaFiltrada.filter(producto =>
            producto.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    filtrarPorTipo(tipo){
        return this.listaFiltrada.filter(producto => producto.tipo.toLowerCase() === tipo.toLowerCase());
    }

    filtrarPorPrecio(min, max) {
        return this.listaFiltrada.filter(producto => {
            if (min === "" && max === "") {
                return true;
            } else if (min === "") {
                return Math.round(producto.precio) <= Math.round(max);
            } else if (max === "") {
                return Math.round(producto.precio) >= Math.round(min);
            } else {
                return Math.round(producto.precio) >= Math.round(min) && Math.round(producto.precio) <= Math.round(max);
            }
        });
    }

    aplicarFiltros(){
        this.listaFiltrada = [...this.listaProductos];
        const nombre = document.getElementById("filtro-nombre").value;
        const tipo = document.getElementById("filtro-tipo").value;
        const min = document.getElementById("filtro-precio-min").value;
        const max = document.getElementById("filtro-precio-max").value;
        const orden = document.getElementById("ordenar-productos").value;
        const limpiarFiltrosBtn = document.getElementById("limpiar-filtros");

        if (nombre) {
            this.listaFiltrada = this.filtrarPorNombre(nombre);
        }
        if (tipo) {
            this.listaFiltrada = this.filtrarPorTipo(tipo);
        }
        if (min || max) {
            this.listaFiltrada = this.filtrarPorPrecio(min, max);
        }
        if(orden){
            this.listaFiltrada = this.ordenarProductos(orden);
        }

        if (nombre || tipo || min || max || orden){
            limpiarFiltrosBtn.classList.add("btn-danger");
        }
        else{
            limpiarFiltrosBtn.classList.remove("btn-danger");
        }

        this.cargarProductos();
    }

    limpiarFiltros() {
        document.getElementById("filtro-nombre").value = "";
        document.getElementById("filtro-tipo").value = "";
        document.getElementById("filtro-precio-min").value = "";
        document.getElementById("filtro-precio-max").value = "";
        document.getElementById("ordenar-productos").value = "";
        document.getElementById("limpiar-filtros").classList.remove("btn-danger");
        this.listaFiltrada = this.listaProductos;
        this.cargarProductos();
    }

    cargarBotonesFiltro(){
        const aplicarFiltrosBtn = document.getElementById("aplicar-filtros");
        const limpiarFiltrosBtn = document.getElementById("limpiar-filtros");

        aplicarFiltrosBtn.addEventListener("click", () => {
            this.aplicarFiltros();
        });
          
        limpiarFiltrosBtn.addEventListener("click", () => {
            this.limpiarFiltros();
        });
    }

    cargarModal(){
        const goToCartBtn = document.getElementById("go-to-cart-btn");
        const cartToggleBtn = document.getElementById("cart-toggle-btn");
        goToCartBtn.addEventListener("click", () => {
            cartToggleBtn.click();
        });
    }

    cargarProductos(){
        const productosContainer = document.getElementById("productos-container");
        productosContainer.innerHTML = "";

        if(this.listaFiltrada.length === 0){
            productosContainer.innerHTML = '<div class="d-flex justify-content-center w-100 pt-4"><h4 class="filter-error p-3">No existen elementos que coincidan con los criterios de búsqueda</h4></div>';
        }
        else{
            this.listaFiltrada.forEach( producto => {
                productosContainer.innerHTML += producto.descripcionProducto();
            });
            this.listaFiltrada.forEach( producto => {
                const btn_ap = document.getElementById(`ap-${producto.id}`);
                btn_ap.addEventListener("click", () => {
                    carrito.agregar(producto);
                    carrito.guardarEnStorage();
                    carrito.mostrarEnDOM();
                });
            });
        }
    }

    mostrarEnDOM(){
        this.cargarBotonesFiltro();
        this.cargarModal();
        this.cargarProductos();
    }
}

class Carrito{
    constructor(){
        this.listaCarrito = [];
        this.codigoPostal = this.codigoPostal;
        this.costoEnvio = 0;
        this.envioExpress = this.envioExpress;
        this.costoEnvioExpress = 1500;
        this.costoEnvioBonificado = 15000;
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
        producto.cantidadEnCarrito == producto.stock ? error.style.visibility = "visible" : error.style.visibility = "hidden";
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
        localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito));
        const envioData = {
            codigoPostal: this.codigoPostal,
            costoEnvio: this.costoEnvio,
            envioExpress: this.envioExpress
        };
        localStorage.setItem("datosEnvio", JSON.stringify(envioData));
    }

    recuperarStorage(){
        let listaAux = [];
        let listaCarritoLocalStorage = JSON.parse(localStorage.getItem("listaCarrito"));
        if (listaCarritoLocalStorage !== null) {
            listaCarritoLocalStorage.forEach(producto => {
                let nuevoProducto = new Producto(...Object.values(producto));
                listaAux.push(nuevoProducto);
            });
        }
        this.listaCarrito = listaAux;

        let envioData = JSON.parse(localStorage.getItem("datosEnvio"));
        if (envioData) {
            this.codigoPostal = envioData.codigoPostal;
            this.costoEnvio = envioData.costoEnvio;
            this.envioExpress = envioData.envioExpress;
        } else {
            this.codigoPostal = ""; 
            this.costoEnvio = 0;
            this.envioExpress = false; 
        }
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
        const btn_dciu = document.getElementById(`delete-cart-item-update-${producto.id}`);
        
        btn_ep.addEventListener("click", () => {
            setTimeout(() => {
                this.eliminarProducto(producto.id);
                this.guardarEnStorage();
                this.mostrarEnDOM();
                Toastify({
                    text: "Producto eliminado",
                    duration: 1600,
                    newWindow: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#ab2143",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "600",
                        boxShadow: "0 0 1rem #8b8b8b"
                    },
                  }).showToast();
            }, 1200);
            btn_dciu.style.visibility = "visible";
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
                this.mostrarEnDOM();
            }
        });

        btn_minus.addEventListener("click", () => {
            if (producto.cantidadEnCarrito > 1) {
                producto.restarCantidad(1);
                this.guardarEnStorage();
                this.mostrarEnDOM();
            }
        });

        cartQuantity.innerHTML = producto.cantidadEnCarrito;
        this.verificarStock(producto);
    }

    cargarSubtotalProductos(){
        const subtotalCarritoContainer = document.getElementById("subtotal-carrito-container");
        subtotalCarritoContainer.innerHTML = `
            <h6 class="pt-2">Subtotal: </h6>
            <p id="subtotal-carrito">$${this.calcularTotalProductos()}</p>`;
    }

    calcularEnvio(){
        const codigoPostalIngresado = document.getElementById('shipping').value;
        const error = document.getElementById('postal-code-error');
        const error2 = document.getElementById('postal-code-error-2');

        if(isNaN(codigoPostalIngresado) || codigoPostalIngresado < 1000 || codigoPostalIngresado > 2000){
            error.style.display = "block";
            error2.style.display = "none";
        }
        else{
            error.style.display = "none";
            this.codigoPostal = codigoPostalIngresado;
            this.costoEnvio = 0;
            if (this.codigoPostal >= 1700 && this.codigoPostal <= 1800) {
                this.costoEnvio = 500;
            } 
            else if ((this.codigoPostal >= 1600 && this.codigoPostal <= 1699) || (this.codigoPostal >= 1801 && this.codigoPostal <= 1900)) {
                this.costoEnvio = 800;
            }
            else {
                this.costoEnvio = 1000;
            }
            this.guardarEnStorage();
            this.mostrarEnDOM();
        }
    }

    calcularEnvioExpress(){
        if(this.envioExpress){
            return this.costoEnvioExpress;
        } 
        else{
            return 0;
        }
    }

    actualizarEnvioExpress(){
        let envioExpressBtn = document.getElementById("envio-express");
        if(envioExpressBtn.checked){
            this.envioExpress = true;
        }
        else{
            this.envioExpress = false;
        }
    }

    calcularEnvioBonificado(){
        if(this.calcularTotalProductos() < this.costoEnvioBonificado){
            return `Faltan $${this.costoEnvioBonificado - this.calcularTotalProductos()} para obtener envío bonificado.`;
        }
        else{
            return "¡Envío bonificado!";
        }
    }

    actualizarBarraDeProgreso(){
        let barraDeProgreso = document.getElementById('progress-bar');
        let anchoBarra = (this.calcularTotalProductos() / this.costoEnvioBonificado) * 100;
        barraDeProgreso.style.width = `${Math.min(anchoBarra, 100)}%`;
    }

    actualizarEnvioBonificado(){
        if(this.calcularTotalProductos() >= this.costoEnvioBonificado){
            return "¡Envío Bonificado!";
        }
        else{
            return "$" + this.costoEnvio;
        }
    }

    cargarEnvio(){
        const envioCarritoContainer = document.getElementById("envio-carrito-container");
        envioCarritoContainer.innerHTML =   `<div class="d-flex flex-column">
                                                <div id="progress" class="progress">
                                                    <div id="progress-bar" class="progress-bar"></div>
                                                </div>
                                                <p id=""envio-bonificado" class="align-self-center envio-bonificado">${this.calcularEnvioBonificado()}</p>
                                            </div>
                                            <div id="envio-normal-carrito-container">
                                                <div class="cart-shipping d-flex justify-content-start align-items-center pe-5 pt-4 pb-2 mt-2 mb-1">
                                                    <i class="fa fa-truck col-1" aria-hidden="true"></i>
                                                    <input type="text" id="shipping" class="form-control col-2" placeholder="Código Postal" maxlength="4" pattern="[0-9]" autocomplete="off">
                                                    <button id="calcular-envio-btn" class="btn shipping-btn ms-3 col-4">Calcular envío</button>
                                                </div>
                                                <p id="postal-code-error" class="col-7 mb-2 postal-code-error">Introduce un código postal válido (1000 a 2000) para calcular, sólo Buenos Aires y C.A.B.A.</p>
                                                <p id="postal-code-error-2" class="mb-2 postal-code-error">Introduce un código postal para proceder con la compra.</p>
                                            </div>
                                            <div id="subtotal-envio-carrito-container" class="cart-subtotal d-flex justify-content-between align-items-center pe-5 pt-2mt-2">
                                                <h6>Costo de envío: </h6>
                                                <p id="subtotal-envio-carrito">${this.actualizarEnvioBonificado()}</p>
                                            </div>
                                            <p class="col-4 ms-1 postal-code">C.P.: ${this.codigoPostal}</p>
                                            <div id="envio-express-carrito-container" class="cart-express-shipping d-flex justify-content-between align-items-center pe-5 pt-2 pb-2 mt-2 mb-1">
                                                <div class="d-flex justify-content-start align-items-center gap-3">
                                                    <i class="fa fa-motorcycle" aria-hidden="true"></i>
                                                    <label for="envio-express">Envío express</label>
                                                    <input type="checkbox" id="envio-express" class="express-shipping-btn" name="envio-express" value="">
                                                </div>
                                                <div>
                                                    <p class="col-5 express-shipping-value">$${this.calcularEnvioExpress()}</p>
                                                </div>
                                            </div>`;

        document.getElementById('envio-express').checked = this.envioExpress;
        this.actualizarBarraDeProgreso();

        const calcularEnvioBtn = document.getElementById("calcular-envio-btn");
        calcularEnvioBtn.addEventListener("click", () =>{
            this.calcularEnvio();
        });

        const envioExpressBtn = document.getElementById("envio-express");
        envioExpressBtn.addEventListener("change", () => {
            this.actualizarEnvioExpress();
            this.guardarEnStorage();
            this.mostrarEnDOM();
        });
    }

    verificarEnvioDisponible(){
        const error = document.getElementById('postal-code-error-2');
        var btnFinalizar = document.getElementById("finalizar-btn");
        if(!this.codigoPostal){
            error.style.display = "block";
            btnFinalizar.setAttribute("disabled", "disabled");
        } 
        else{
            error.style.display = "none";
            btnFinalizar.removeAttribute("disabled");
        }
    }

    calcularTotal(){
        let total = this.calcularTotalProductos();
        if(total < this.costoEnvioBonificado){
            total += this.costoEnvio;
        }
        if (this.envioExpress) {
            total += this.costoEnvioExpress;
        }
        return total;
    }

    cargarTotalFinalizarYVaciar(){
        const totalCarritoContainer = document.getElementById("total-carrito-container");
        totalCarritoContainer.innerHTML = `
            <div class="cart-total d-flex justify-content-between align-items-center pe-5 pt-2 pb-2 mt-2 mb-2">
                <h6 class="pt-2">Total: </h6>
                <p id="total-carrito">$${this.calcularTotal()}</p>
            </div>
            <div class="d-flex justify-content-between pe-3">
                <div>
                    <button id="finalizar-btn" type="button" class="btn btn-dark cart-btn-final" data-bs-toggle="modal" data-bs-target="#finalizarCompra">Finalizar compra</button>
                </div>
                <div>
                    <button type="button" id="empty-cart-btn" class="btn btn-light cart-btn-empty">Vaciar carrito</button>
                </div>
            </div>`;

        const btn_ec = document.getElementById("empty-cart-btn");
        btn_ec.addEventListener("click", () => {
            Swal.fire({
                title: '¿Quieres eliminar todos los productos del carrito?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ab2143',
                cancelButtonColor: '#acaaaa',
                cancelButtonText: 'NO',
                confirmButtonText: 'SI'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.vaciar();
                    this.guardarEnStorage();
                    this.mostrarEnDOM();
                    Swal.fire({
                        text: 'Productos eliminados del carrito',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                }
            })
        });

        const payment_form = document.getElementById("formulario-pago");
        payment_form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.vaciar();
            this.guardarEnStorage();
            Swal.fire({
                text: 'Pago procesado con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                location.reload();
            });
        });
    }

    cargarContadorProductos(){
        let contadorProductosCarrito = document.getElementById("product-cart-counter");
        contadorProductosCarrito.innerHTML = `${this.listaCarrito.length}`;
    }

    mostrarEnDOM(){
        const productosCarritoContainer = document.getElementById("productos-carrito-container");
        const subtotalCarritoContainer = document.getElementById("subtotal-carrito-container");
        const envioCarritoContainer = document.getElementById("envio-carrito-container");
        const totalCarritoContainer = document.getElementById("total-carrito-container");
        productosCarritoContainer.innerHTML = "";
        subtotalCarritoContainer.innerHTML = "";
        envioCarritoContainer.innerHTML = "";
        totalCarritoContainer.innerHTML = "";

        this.cargarContadorProductos();

        if (this.estaVacio()){
            productosCarritoContainer.innerHTML = `
            <div class="empty-cart pt-4">
                <p>El carrito de compras está vacío.<p>
            </div>`;
        }
        else {
            this.cargarProductosDelCarrito();
            this.cargarSubtotalProductos();
            this.cargarEnvio();
            this.cargarTotalFinalizarYVaciar();
            this.verificarEnvioDisponible();
        }
    }

}

//Carga de degustaciones

class Degustacion{
    constructor(id, nombre, fecha, hora, descripcion, img){
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.hora = hora;
        this.descripcion = descripcion;
        this.img = img;
    }

    formatearFecha(){
        const dt = luxon.DateTime.fromISO(this.fecha);
        return dt.toLocaleString(luxon.DateTime.DATE_SHORT);
    }

    descripcionDegustacion(){
        const fechaFormateada = this.formatearFecha();
        return `
        <div class="mb-3" data-aos="fade-up" data-aos-duration="2500" data-aos-once="true">
            <a href="https://www.whatsapp.com">
                <div class="tasting-cards">
                    <div class="tasting-card-top-items d-flex justify-content-between">
                        <div class="col-xl-8 pt-2">
                            <h5>${this.nombre} - Wine Tasting</h5>
                            <p>
                                <small class="text-muted">${fechaFormateada} - ${this.hora}hs.</small>
                            </p>
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                            <div class="align-self-center">
                                <img class="tasting-card-pic img-fluid" src="${this.img}" alt="foto de vinos">
                            </div>
                        </div>
                    </div>
                    <p class="mt-3" style="text-align: justify;">
                        <small>${this.descripcion}</small>
                    </p>
                    <p class="mt-2"><small>¡Reservas al Whatsapp!</small></p>
                </div>
            </a>
        </div>`;
    }
}

class DegustacionController{
    constructor(){
        this.listaDegustacionesCompleta = [];
        this.listaDegustacionesProximas = [];
    }

    agregar(degustacion){
        if (degustacion instanceof Degustacion) {
            this.listaDegustacionesCompleta.push(degustacion);
        }
    }

    cargarDatos(){
        fetch('tastings.json')
            .then(response => response.json())
            .then(response => {
                response.forEach(degustacion => {
                    let nuevaDegustacion = new Degustacion(...Object.values(degustacion));
                    this.agregar(nuevaDegustacion);
                });
                this.listaDegustacionesCompleta.forEach(degustacion => {
                    const dt = luxon.DateTime.fromISO(`${degustacion.fecha}T${degustacion.hora}`);
                    const hoy = luxon.DateTime.now();
                    dt >= hoy && this.listaDegustacionesProximas.push(degustacion);
                });
                this.mostrarEnDOM();
            })
        .catch(error => console.error('Error al cargar degustaciones', error));
    }    

    mostrarEnDOM(){
        const degustacionesContainer = document.getElementById("degustaciones-container");
        degustacionesContainer.innerHTML = "";

        if(this.listaDegustacionesProximas.length === 0){
            degustacionesContainer.innerHTML = '<div class="d-flex justify-content-center w-100 pt-4"><h4 class="filter-error p-3">No tenemos por el momento próximas degustaciones</h4></div>';
        }
        else{
            this.listaDegustacionesProximas.forEach( degustacion => {
                degustacionesContainer.innerHTML += degustacion.descripcionDegustacion();
            });
        }
    }
}

const controladorP = new ProductoController();
const carrito = new Carrito();
const controladorD = new DegustacionController();
window.addEventListener('load', () => {
    pageScrolled();
    paymentCard();
    controladorP.cargarDatos();
    carrito.recuperarStorage();
    carrito.mostrarEnDOM();
    controladorD.cargarDatos();
});
