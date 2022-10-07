"use strict";

let botones = document.querySelectorAll(".btn");

console.table(botones);
console.log(botones);

/*
element.children, encuentra los elementos hijos
element.parentElement , encuentra el elemento padre
element.nextElementSibling , encuentra el siguiente hermano 
element.previousElementSibling , encuentra el hermano anterior
element.firstElementChild , encuentra el primer hijo
element.lastElementChild , el último hijo
*/

for (let i=0; i<botones.length;i++){
    botones[i].addEventListener("click", function(e){
        let texto = this.nextElementSibling;
        texto.classList.toggle("ver");
    });
}