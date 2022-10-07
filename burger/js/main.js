"use strict";

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina(){
    document.getElementById("btn-menu").addEventListener("click",verMenu);

    function verMenu(){
        document.querySelector(".barra").classList.toggle("barraVisible");
    }
}