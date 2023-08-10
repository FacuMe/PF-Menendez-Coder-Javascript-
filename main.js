//navbar scrolled
const brandLogo = document.querySelector('.brand-logo');
const brand = document.querySelector('.brand');
const brandContainer = document.querySelector('.brand-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        brandLogo.classList.add('navbar-scrolled-logo');
        brand.classList.add('navbar-scrolled-brand');
        brandContainer.classList.add('navbar-scrolled-brand-container');
    } 
    else if (window.scrollY <= 10) {
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
