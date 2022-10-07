"use strict";

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar(){
    alert("Async Await.");
    /**BASICO*/
    let btnCargarBasico = document.querySelectorAll(".boton-cargar-basico");
    btnCargarBasico.forEach(btn => btn.addEventListener("click", cargarContenido));
    
    async function cargarContenido(event){
        event.preventDefault();
        let contenido = document.querySelector("#div-contenido");
        contenido.innerHTML = `<h1> CARGANDO ... <h1>`;
        try{
            let response = await fetch("http://web-unicen.herokuapp.com/api/html");
            if (response.ok){
                let t = await response.text();
                procesarTexto(t,contenido);
            }else{
                contenido.innerHTML = `<h1> ERROR - FAILE URL<h1>`;
            }
        }catch(error){
            contenido.innerHTML = `<h1> ERROR - CONECTION FAILE ${error.text}<h1>`;
        }
    }

    function procesarTexto(texto,contenido){
        contenido.innerHTML = texto;
        let btnDelContenido = contenido.querySelectorAll(".js-comportamiento");
        btnDelContenido.forEach(e => e.addEventListener("click", mostrar));
    }

    /**INTERMEDIO*/
    let btnCargarIntermedio = document.querySelectorAll(".boton-cargar-intermedio");    
    btnCargarIntermedio.forEach(btn => btn.addEventListener("click", async function(e){
        let contenido = this.nextElementSibling;
        contenido.innerHTML = `<h1> CARGANDO ... <h1>`;
        try{
            let response = await fetch("http://web-unicen.herokuapp.com/api/html");
            if (response.ok){
                let texto = await response.text();
                procesarTexto(texto, contenido);
            }else{
                contenido.innerHTML = `<h1> ERROR - FAILE URL<h1>`;
            }
        }catch(error){
            contenido.innerHTML = `<h1> ERROR - CONECTION FAILE ${error.text}<h1>`;
        }
    }));

    function mostrar(event){
        event.preventDefault();
        alert("Andó");
    }
    
}