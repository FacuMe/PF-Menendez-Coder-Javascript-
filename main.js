//navbar scrolled
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



// Función para calcular el costo de envío
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

    envioExpress = calcularEnvioExpress(); 
    costoFinal = costoEnvio + envioExpress;

    alert("El costo de envío es $" + costoFinal + ".");
}

function calcularEnvioExpress () {
    let valorEnvioExpress;
    let envioExpress;

    while (envioExpress !== 1 && envioExpress !== 2) {
        envioExpress = Number(prompt("¿Quieres envío express? \n (Ingresa el número de opción) \n 1. Si. \n 2. No"));
    }
    if (envioExpress === 1) {
        valorEnvioExpress = 1000;
        return valorEnvioExpress;
    }
    else {
        return 0;
    }
}
  
const botonCalcular = document.getElementById("boton-calcular-envio");
botonCalcular.addEventListener("click", calcularCostoEnvio);





//Carga y filtro de productos 
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

function filtrarPorTipo(listaDeProductos){
    let productosFiltradosPorTipo = listaDeProductos.filter(producto => producto.tipo === "Tinto");
    return productosFiltradosPorTipo;
}
