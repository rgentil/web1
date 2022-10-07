"use strict";

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar(){
    alert("vamos a meterle fech then then a todo.");
    /**BASICO*/
    let btnCargarBasico = document.querySelectorAll(".boton-cargar-basico");
    btnCargarBasico.forEach(btn => btn.addEventListener("click", cargarContenido));
    function cargarContenido(event){
        event.preventDefault();
        let contenido = document.querySelector("#div-contenido");
        contenido.innerHTML = `<h1> CARGANDO ... <h1>`;
        fetch("http://web-unicen.herokuapp.com/api/html")
            .then(response => {
                if (response.ok){
                    response.text().then(procesarTexto);
                    /*response.text().then ( texto => {
                        contenido.innerHTML = texto;
                        let btnDelContenido = contenido.querySelectorAll(".js-comportamiento");
                        btnDelContenido.forEach(e => e.addEventListener("click", mostrar));
                    }
                    )  */
                }else{
                    contenido.innerHTML = `<h1> ERROR - FAILE URL<h1>`;
                }  
            })
            .catch (error => {
                contenido.innerHTML = `<h1> ERROR - CONECTION FAILE ${error.text}<h1>`;
            })

    }
    function procesarTexto(texto){
        let contenido = document.querySelector("#div-contenido");
        contenido.innerHTML = texto;
        let btnDelContenido = contenido.querySelectorAll(".js-comportamiento");
        btnDelContenido.forEach(e => e.addEventListener("click", mostrar));
    }

    /**INTERMEDIO*/
    let btnCargarIntermedio = document.querySelectorAll(".boton-cargar-intermedio");    
    btnCargarIntermedio.forEach(btn => btn.addEventListener("click", function(e){
        let contenido = this.nextElementSibling;
        contenido.innerHTML = `<h1> CARGANDO ... <h1>`;
        fetch("http://web-unicen.herokuapp.com/api/html")
            .then(response => {
                if (response.ok){
                    response.text().then ( texto => {
                        contenido.innerHTML = texto;
                        let btnDelContenido = contenido.querySelectorAll(".js-comportamiento");
                        btnDelContenido.forEach(e => e.addEventListener("click", mostrar));
                    }
                    ) 
                }else{
                    contenido.innerHTML = `<h1> ERROR - FAILE URL<h1>`;
                }  
            })
            .catch (error => {
                contenido.innerHTML = `<h1> ERROR - CONECTION FAILE ${error.text}<h1>`;
            })
    }));


    function mostrar(event){
        event.preventDefault();
        alert("Andó");
    }

}