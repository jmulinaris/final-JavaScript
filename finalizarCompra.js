import { actualizarCarrito } from "./carritoIndex.js";
import { cerrarModal } from "./modal.js";

const contenedorCarrito = document.getElementById('carrito-contenedor');
export const botonFinalizar = document.getElementById("finalizar-compra");

let carritoDeCompras =[];

if (carritoDeCompras.length > 0 ){
    // botonFinalizar.classList.toggle ("mostrarBoton");
    alert("si funciono");
}

botonFinalizar.addEventListener ("click", async ()=> {
    cerrarModal();
    const { value: email } = await Swal.fire({
            title: 'Para continuar, ingrese su mail',
            input: 'email',
            inputPlaceholder: 'Ingrese su email',
            showCancelButton: true,
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
                'success'
            );
        }
    });
// const botonFinalizar = document.getElementById("finalizar-compra");
// let carritoDeCompras = [];

// export function mostrarBotones (carritoDeCompras){
//     localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));

//     if (carritoDeCompras.length = 0){
//         botonFinalizar.classList.add ("mostrarBoton");
//     }
// };

