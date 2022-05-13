const open = document.getElementById("open");
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");

function abrirModal () {
    modal_container.classList.add("show");
}

function cerrarModal (){
    modal_container.classList.remove("show");
}

open.addEventListener("click", abrirModal);

close.addEventListener("click", cerrarModal);

modal_container.addEventListener("mouseleave", cerrarModal);


export {cerrarModal};
