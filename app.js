import {productos} from "./stock.js";

const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("productos");
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("row");
        div.innerHTML += `
            <div class="card col" style="width: 18rem;">
                <img src=${producto.img}>
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.desc}</p>
                <p><strong>$${producto.precio}</strong></p>
                <a href="#" class="btn btn-secondary" id="boton${producto.id}">COMPRAR</a>
            </div>
            </div>
            `
    contenedorProductos.appendChild (div);
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () =>{
        carritoIndex(producto.id);
        })
    })
};

mostrarProductos(productos);