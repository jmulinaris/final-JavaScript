import { mostrarProductos } from "./app.js";
import { getData } from "./getData.js";
import { cerrarModal } from "./modal.js";
import { productos } from "./stock.js";


let carritoDeCompras =[];
let carritoEnStorage =[];

const contenedorCarrito = document.getElementById('carrito-contenedor');

//AGREGAR AL CARRITO
export const agregarAlCarrito = (productoId) => {
    if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
    }

    let productoEnCarrito = carritoDeCompras.find(producto => producto.id == productoId);
    sumarRepetidos(productoEnCarrito, productoId);
    eliminarProductoCarrito(productoId);
}

//SUMAR SI HAY REPETIDOS
const sumarRepetidos = (productoEnCarrito, productoId) => {
    if (productoEnCarrito) {
    productoEnCarrito.cantidad++
    document.getElementById(`cantidad${productoEnCarrito.id}`).innerHTML = `<p id=cantidad${productoEnCarrito.id}>Cantidad:${productoEnCarrito.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
    } else {
    renderProductosCarrito(productoId);
    }
}

//ELIMINAR PRODUCTO
export const eliminarProductoCarrito = (productoId) => {
    if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
    }
    let botonEliminar = document.getElementById(`eliminar${productoId}`);
    botonEliminar.addEventListener('click', () => {
    botonEliminar.parentElement.remove();

    carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);
    actualizarCarrito(carritoDeCompras);
    });
}

//ACTUALIZAR CARRITO
let contadorCarrito = document.getElementById('contador-carrito');
let precioTotal = document.getElementById('precioTotal');

export const actualizarCarrito = (carritoDeCompras) => {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0);
    let total = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    precioTotal.innerHTML = `Total a pagar: $${total}`
    if (total === 0){
        precioTotal.innerHTML = `No hay productos en el carrito`
    }
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    renderBotones();
}

//LISTA DE PRODUCTOS DEL CARRITO
const renderProductosCarrito = (productoId) => {
    let producto = productos.find(producto => producto.id == productoId);
    carritoDeCompras.push(producto);
    producto.cantidad = 1;
    console.log(carritoDeCompras);
    let div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = ` <p>${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <img id=eliminar${producto.id} class="boton-eliminar" src="img/trash3.svg" alt="close" id="close"></img>
                `
    contenedorCarrito.appendChild(div);
    actualizarCarrito(carritoDeCompras);
}

//VERIFICAR STORAGE AL ENTRAR/ACTUALIZAR LA PAGINA
document.addEventListener("DOMContentLoaded", () => {

    mostrarProductos();

    if (localStorage.getItem("carrito")) {
    carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));
    carritoEnStorage.length === 0;
    carritoEnStorage.map((producto) => {
        let div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: $${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                        <img id=eliminar${producto.id} class="boton-eliminar" src="img/trash3.svg" alt="close" id="close"></img>
                    `
    contenedorCarrito.appendChild(div);
    actualizarCarrito(carritoEnStorage);
    eliminarProductoCarrito(producto.id);
    })
    renderBotones();
    }
})


//VACIAR CARRITO
const botonVaciar = document.getElementById("vaciar-carrito");

function vaciarCarrito() {
    carritoDeCompras = [];
    contenedorCarrito.innerHTML="";
    actualizarCarrito(carritoDeCompras);
    Toastify({
        text: "Se vació el carrito",
        duration:1000,
        position:"center",
        style:{
            background: "linear-gradient(to right, var(--pink), rgb(228, 118, 136)"
        }
    }).showToast();
    cerrarModal();
}

botonVaciar.addEventListener ("click", vaciarCarrito);


//SEGUIR COMPRANDO
const botonSeguir = document.getElementById("seguir-compra");

botonSeguir.addEventListener("click", ()=>{
    cerrarModal();
});

//TERMINAR COMPRA
const botonFinalizar = document.getElementById("finalizar-compra");

botonFinalizar.addEventListener ("click", async ()=> {
    cerrarModal();
    const { value: email } = await Swal.fire({
            title: 'Para continuar, ingrese su mail',
            input: 'email',
            inputPlaceholder: 'Ingrese su email',
            showCancelButton: true,
            confirmButtonColor:"var(--pink)",
            cancelButtonText: 'Cancelar',
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
        if(email){
            contenedorCarrito.innerHTML = '';
            carritoDeCompras = [];
            actualizarCarrito(carritoDeCompras);
            Swal.fire(
                '¡Gracias por su compra!',
                'Recibirá un mail con el link de pago',
                'success',
            );
        }
    });

//MOSTRAR U OCULTAR BOTONES DEL CARRITO
function renderBotones (){
    if(carritoDeCompras.length === 0){
        botonFinalizar.classList.add("ocultarBoton");
        botonVaciar.classList.add("ocultarBoton");
    } else {
        botonFinalizar.classList.remove("ocultarBoton");
        botonVaciar.classList.remove("ocultarBoton");
    }
}





