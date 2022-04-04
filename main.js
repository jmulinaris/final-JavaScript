let total = 0;
let precio = 0;
let otroProducto = false;

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        }
    }

class Pedido {
    constructor (nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const productos = [];
const carritoDeCompras = [];

productos.push(new Producto ("Promo Fernet", 1100, 20));
productos.push(new Producto ("Promo Campari", 1300, 12));
productos.push(new Producto ("Promo Gancia", 900, 8));
console.log(productos)

function agregarAlCarrito (){
    do {
        let producto = parseInt (prompt("Qué necesitás comprar?:\n 1- Promo Fernet\n 2- Promo Campari\n 3- Promo Gancia"));
        let cantidad = Number(prompt("Ingresá la cantidad"));
            switch (producto){
                case 1:
                    if (cantidad > productos[0].stock){
                        alert("Lo sentimos, no tenemos stock suficiente" + "\nEl stock disponible es de " + productos[0].stock);
                        precio = 0;
                        cantidad = 0;
                    } else if (cantidad ===0){
                        alert("No se agregó ningún producto, intente nuevamente")
                    }
                    else {
                        alert("Agregaste al carrito " + cantidad + " unidades de " + productos[0].nombre);
                        precio = productos[0].precio;
                        carritoDeCompras.push(new Pedido (productos[0].nombre, precio, cantidad));
                    };
                    break;
                case 2:
                    if (cantidad > productos[1].stock){
                        alert("Lo sentimos, no tenemos stock suficiente" + "\nEl stock disponible es de " + productos[1].stock);
                        precio = 0;
                        cantidad = 0;
                    } else if (cantidad ===0){
                        alert("No se agregó ningún producto, intente nuevamente")
                    }else {
                        alert("Agregaste al carrito " + cantidad + " unidades de " + productos[1].nombre);
                        precio = productos[1].precio;
                        carritoDeCompras.push(new Pedido (productos[1].nombre, precio, cantidad));
                    }
                    break;
                case 3:
                    if (cantidad > productos[2].stock){
                        alert("Lo sentimos, no tenemos stock suficiente" + "\nEl stock disponible es de " + productos[2].stock);
                        precio = 0;
                        cantidad = 0;
                    } else if (cantidad ===0){
                        alert("No se agregó ningún producto, intente nuevamente")
                    }
                    else {
                        alert("Agregaste al carrito " + cantidad + " unidades de " + productos[2].nombre);
                        precio = productos[2].precio;
                        carritoDeCompras.push(new Pedido (productos[2].nombre, precio, cantidad));
                    }
                    break;
                default:
                    alert("Algunos de los datos ingresados no son correctos");
                    precio = 0;
                    cantidad = 0;
            }
            total = total + precio * cantidad;
            otroProducto = confirm("¿Querés agregar otro producto?");
    } while (otroProducto);
    console.log(carritoDeCompras);
    const contadorCarrito = carritoDeCompras.reduce ((acc, el) => acc + el.cantidad, 0);
    const precioTotal = carritoDeCompras.reduce ((acc, el) => acc + (el.cantidad * el.precio), 0);
    if (precioTotal !=0){
    alert ("La cantidad de productos agregados al carrito es de " + contadorCarrito + "\nTotal: $" + precioTotal)
    }
    console.log(precioTotal);
}

function calcularEnvio (total){
    let confirmacion = confirm ("Querés envio a domicilio?");
    if (confirmacion && total >=2500){
        alert("Tenés envío sin cargo. El total de tu compra es $ "+ total);
    } else if (confirmacion && total < 2500 && total !=0){
        total = total + 200;
        alert("El envio cuesta $200. El total de tu compra es $ " + total);
    } else {
        alert("El total de tu compra es $ " + total);
    }
    return total;
}

agregarAlCarrito();
if (total > 0) {
	calcularEnvio(total);
} else {
	alert('No has agregado nada al carrito, vuelve pronto.');
}