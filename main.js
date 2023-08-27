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
let listaDeProductos = [];
document.addEventListener('DOMContentLoaded', () => {
    
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listaDeProductos = data;
            mostrarTodosLosProductos(listaDeProductos);
        })
    .catch(error => console.error('Error al cargar los vinos:', error));
});

function mostrarTodosLosProductos(productos) {
    const productosContainer = document.getElementById('productos-container');
  
            productos.forEach(producto => {
                const productoCard = document.createElement('div');
                productoCard.classList.add('col-6', 'col-sm-3', 'd-flex', 'justify-content-center', 'products__block__item');
    
                const productoBox = document.createElement('div');
                productoBox.classList.add('products__block__item__box');
    
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('products__block__item__box__image-container');
                const image = document.createElement('img');
                image.src = producto.imagen; 
                image.classList.add('products__block__item__box__image-container__img');
                image.alt = producto.nombre;
    
                const name = document.createElement('p');
                name.classList.add('products__block__item__box__name');
                name.textContent = producto.nombre;
    
                const title = document.createElement('p');
                title.classList.add('products__block__item__box__title');
                title.textContent = producto.tipo;
    
                const price = document.createElement('p');
                price.classList.add('products__block__item__box__price');
                price.textContent = producto.precio;
    
                const buttonContainer = document.createElement('div');
                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('btn', 'btn-dark', 'products__block__item__box__btn');
                button.textContent = 'Agregar al carrito';
    
                imageContainer.appendChild(image);
                productoBox.appendChild(imageContainer);
                productoBox.appendChild(name);
                productoBox.appendChild(title);
                productoBox.appendChild(price);
                buttonContainer.appendChild(button);
                productoBox.appendChild(buttonContainer);
                productoCard.appendChild(productoBox);
                productosContainer.appendChild(productoCard);
            });
}

// Filtro productos (TO DO)
function filtrarPorTipo(listaDeProductos){
    let productosFiltradosPorTipo = listaDeProductos.filter(producto => producto.tipo === "Tinto");
    return productosFiltradosPorTipo;
}


// Función para calcular el costo de envío (PRIMERA PREENTREGA)
function calcularCostoEnvio() {
    let codigoPostal;
    let costoEnvio;
    let envioExpress;
    let costoFinal;
    
    while (isNaN(codigoPostal) || codigoPostal < 1000 || codigoPostal > 2000) {
        codigoPostal = Number(prompt("Por favor, ingresa tu código postal:"));
        if (codigoPostal === 0) {
            return;
        }
        else if (isNaN(codigoPostal) || codigoPostal < 1000 || codigoPostal > 2000) {
            alert("Ingresa un código postal numérico válido (entre 1000-2000, sólo Buenos Aires y CABA)");
        }
    }

    if (codigoPostal >= 1700 && codigoPostal <= 1800) {
        costoEnvio = 0;
    } 
    else if ((codigoPostal >= 1600 && codigoPostal <= 1699) || (codigoPostal >= 1801 && codigoPostal <= 1900)) {
        costoEnvio = 500;
    }
    else {
        costoEnvio = 800;
    }

    alert("El costo de envío es $" + costoEnvio + ".");
    envioExpress = calcularEnvioExpress(); 
    costoFinalEnvio = costoEnvio + envioExpress;
    return costoFinalEnvio;
}

function calcularEnvioExpress () {
    let valorEnvioExpress;
    let envioExpress;

    while (envioExpress !== 1 && envioExpress !== 2) {
        envioExpress = Number(prompt("¿Quieres envío express? \n (Costo $1.000 adicional) \n Ingresa el número de opción: \n 1. Si. \n 2. No"));
    }
    if (envioExpress === 1) {
        valorEnvioExpress = 1000;
        return valorEnvioExpress;
    }
    else {
        return 0;
    }
}

//Simular carrito (SEGUNDA PREENTREGA)
class Producto{
    constructor(id, nombre, tipo, precio, imagen, stock, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidad = 0;
    }

    agregarCantidad(cantidadDeseada){
        this.cantidad = this.cantidad + cantidadDeseada;
    }

    descripcion(){
        return "id: " + this.id + " - " + this.nombre + " (" + this.tipo + ") " + "precio: $" + this.precio + "\n";
    }

    descripcionParaCarrito(){
        return "id: " + this.id + " - " + this.nombre + " (" + this.tipo + ") " + "precio: $" + this.precio + " cantidad: "+ this.cantidad + "\n";
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = [];
    }

    agregar(producto){
        this.listaProductos.push(producto);
    }

    mostrar(){
        let descripcionListaProductos =[];
        this.listaProductos.forEach( producto => {
            descripcionListaProductos = descripcionListaProductos + producto.descripcion();
        })
        return descripcionListaProductos;
    }

    buscarId(id){
        return this.listaProductos.find(producto => producto.id == id);
    }
}

class Carrito{
    constructor(){
        this.listaCarrito = [];
    }

    agregar(productoNuevo){
        let existe = this.listaCarrito.some(producto => producto.id == productoNuevo.id);
        if(!existe){
            this.listaCarrito.push(productoNuevo);
        }
    }

    mostrar(){
        let descripcionListaCompra = "Carrito: \n\n"
        this.listaCarrito.forEach( producto => {
            descripcionListaCompra = descripcionListaCompra + producto.descripcionParaCarrito();
        })
        return descripcionListaCompra;
    }

    calcularTotal(){
        return this.listaCarrito.reduce((total,producto) => total + producto.precio * producto.cantidad, 0);
    }
}

const p1 = new Producto(1, "Vino Reserva", "Tinto", 2000, "./img/product1.jpg", 5);
const p2 = new Producto(2, "Vino Premium", "Blanco", 1800, "./img/product1.jpg", 5);
const p3 = new Producto(3, "Vino Elegante", "Rosado", 1500, "./img/product1.jpg", 5);
const p4 = new Producto(4, "Vino Gran Enemigo", "Tinto", 4000, "./img/product1.jpg", 5);
const p5 = new Producto(5, "Vino Durigutti Cabernet Franc", "Tinto", 3000, "./img/product1.jpg", 5);
const p6 = new Producto(6, "Vino Durigutti Tempranillo", "Tinto", 3500, "./img/product1.jpg", 5);
const p7 = new Producto(7, "Vino Chardonnay", "Blanco", 6000, "./img/product1.jpg", 5);
const p8 = new Producto(8, "Vino Extra Premium", "Espumante", 8000, "./img/product1.jpg", 5);

const carrito = new Carrito();
const controladorP = new ProductoController();

controladorP.agregar(p1);
controladorP.agregar(p2);
controladorP.agregar(p3);
controladorP.agregar(p4);
controladorP.agregar(p5);
controladorP.agregar(p6);
controladorP.agregar(p7);
controladorP.agregar(p8);

function simularCarrito() {
    let respuesta;
    do{
        let id = Number(prompt("Listado de productos:\n" + controladorP.mostrar() + "\n\nIngrese el ID del producto que desea comprar:"));
        const producto = controladorP.buscarId(id);
        let cantidadDeseada = Number(prompt("Ingrese la cantidad que desea"));
        producto.agregarCantidad(cantidadDeseada);
        carrito.agregar(producto);
        alert(carrito.mostrar());

        respuesta = prompt("¿Desea finalizar la compra? (escriba 'SI' para finalizar)").toLowerCase();
    }while(respuesta != "si")

    let costoEnvio = calcularCostoEnvio();
    let costoCompra = carrito.calcularTotal();
    let costoTotal = costoEnvio + costoCompra;
alert("El total es de: $" + costoTotal + "\n-Compra: $ " + costoCompra +"\n-Envío: $ " + costoEnvio);
}

const botonSimular = document.getElementById("boton-simular-carrito");
botonSimular.addEventListener("click", simularCarrito);