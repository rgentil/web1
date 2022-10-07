"use strict";

document.addEventListener("DOMContentLoaded", iniciarPaginaContanctos);

function iniciarPaginaContanctos(){
    document.getElementById("btn-refresh").addEventListener("click",refresh);
    document.getElementById("btn-validarCaptcha").addEventListener("click",validarCaptcha);
    document.getElementById("p-randomNumber").classList.add("randomNumber");

    let btnEnviar = document.getElementById("btn-enviar");
    
    let formContanto =  document.querySelector("#form-contacto");
    formContanto.addEventListener("submit", enviar);

    refrescarComponentes();

    function refresh(event){
        event.preventDefault();
        refrescarComponentes();
        limpiarCaptcha();
    }

    function refrescarComponentes(){
        let numero = Math.floor((Math.random() * 99) + 1);
        document.querySelector("#p-randomNumber").innerHTML = numero;
        btnEnviar.disabled = true;
    }
    
    function limpiarCaptcha(){
        let pCaptcha = document.getElementById("p-captcha");
        pCaptcha.classList.remove("captchaOk");
        pCaptcha.classList.remove("captchaError");
        pCaptcha.classList.add("captchaOriginal");
        document.querySelector("#textCaptcha").value = "";
        pCaptcha.innerHTML = "Demuestre que es humano, valide el captcha";
    }
    
    function validarCaptcha(event){
        event.preventDefault();
        let textoCaptcha = document.querySelector("#textCaptcha").value;
        let pCaptcha = document.getElementById("p-captcha");
        let valorCaptcha = document.querySelector("#p-randomNumber").innerHTML;
        
        if (textoCaptcha == null || textoCaptcha == ""){
            pCaptcha.classList.remove("captchaOk");
            pCaptcha.classList.remove("captchaError");
            pCaptcha.classList.add("captchaOriginal");
            pCaptcha.innerHTML = "Debe ingresar un número para validar";
    
        }else{
            if (textoCaptcha != null && textoCaptcha == valorCaptcha){
                //console.log("Captcha Aceptado.");
                btnEnviar.disabled = false;
                pCaptcha.classList.remove("captchaError");
                pCaptcha.classList.remove("captchaOriginal");
                pCaptcha.classList.add("captchaOk");
                pCaptcha.innerHTML = "¡Correcto! Envíe el formulario";
            }else{
                //console.log("Captcha Erroneo vuelva prontos.");
                btnEnviar.disabled = true;
                pCaptcha.classList.remove("captchaOk");
                pCaptcha.classList.remove("captchaOriginal");
                pCaptcha.classList.add("captchaError");
                pCaptcha.innerHTML = "¡Incorrecto! Valide nuevamente su humanidad";
            }
        }
    }
    
    function enviar(event){
        event.preventDefault();
        console.log("Enviando formulario enviado.");
        let formData = new FormData(formContanto);
        let nombre = formData.get('nombre');
        let apellido = formData.get('apellido');        
        let email = formData.get('email');
        let sexo = formData.get('sexo');
        let tipoHamburguesaT = formData.get('tipoHamburguesaT');
        let tipoHamburguesaP = formData.get('tipoHamburguesaP');
        let tipoHamburguesaV = formData.get('tipoHamburguesaV');
        let estadoCliente = formData.get('estadoCliente');
        let comentario = formData.get('comentario');

    }

}

