import { agregarAlCarrito } from "./carritoIndex.js";
import { getData } from "./getData.js";

const contenedorProductos = document.getElementById("productos");

//Mostrar los productos mediante DOM
export const mostrarProductos = async () => {
    const productos = await getData();

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("row");
        div.innerHTML += `
            <div class="card col" style="width: 18rem;">
                <img src=${producto.img}>
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.desc}</p>
                <p class="card-text"><strong>$ ${producto.precio}</strong></p>
                <button class="btn btn-secondary" id="boton${producto.id}">COMPRAR</a></button>
            </div>
            </div>
            `
    contenedorProductos.appendChild (div);
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () =>{
        agregarAlCarrito(producto.id);
        Toastify({
            text: `Se agregó ${producto.nombre} al carrito`,
            duration:1000,
            style:{
                background: "linear-gradient(to right, var(--pink), rgb(228, 118, 136)"
            }
        }).showToast();
        })
    })
};