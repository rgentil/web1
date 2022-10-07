"use strict";

document.addEventListener("DOMContentLoaded", iniciarPaginaPrecios);

function iniciarPaginaPrecios(){
    const CANT_INGRESOS = 3;
    const COSTO_DESTACADO = 99;
    
    document.getElementById("p-tabla-nota-aviso").innerHTML = "En ROJO los valores mayores a " + COSTO_DESTACADO;
    
    let filas = [{"servicio":"Take Away", "costo":250},{"servicio":"Adereso", "costo":90}];
    
    let tablaOpciones = document.getElementById("id-table-servicios");    
    
    cargarDatos();

    function cargarDatos(){
        tablaOpciones.innerHTML = `<thead>
                                     <th>Servicios</th>
                                     <th>Costo</th>
                                    </thead>`;
        for (let fila of filas) {
            let servicio = fila.servicio;
            let costo = fila.costo;
            if (costo > COSTO_DESTACADO){
                tablaOpciones.innerHTML += `<tr class="row-servicio tabla-valor-superior"> 
                                                <td>${servicio}</td>
                                                <td>${costo}</td> 
                                            </tr>`;
            }else{
                tablaOpciones.innerHTML += `<tr class="row-servicio"> 
                                                <td>${servicio}</td>
                                                <td>${costo}</td> 
                                            </tr>`;
            }
        }
        //console.table(filas);    
    }

    document.getElementById("btn-agregar-servicio").addEventListener("click",agregarServicio);
    document.getElementById("btn-vaciar-tabla").addEventListener("click",vaciarTabla);
    document.getElementById("btn-x3").addEventListener("click",generarTres);

    function agregarServicio(){
        let inputServicio = document.getElementById("input-tabla-servicio");
        let inputCosto = document.getElementById("input-tabla-costo");
    
        let pRequerido = document.getElementById("p-valor-tabla-requerido");
    
        if (inputServicio.value == null || inputServicio.value == ""){
            pRequerido.innerHTML = "Ingrese descricpión del servicio";
        }else{
            if (inputCosto.value == null || inputCosto.value == ""){
                pRequerido.innerHTML = "Ingrese costo para el servicio";
            }
            else{
                pRequerido.innerHTML = "";
                let fila =  {"servicio":inputServicio.value, "costo":inputCosto.value};
                filas.push(fila);
                inputServicio.value = "";
                inputCosto.value = "";
                cargarDatos();
            }
        }
    }

    function vaciarTabla(){
        filas = [];
        cargarDatos();
    }

    function generarTres(){
        for (let i = 0; i < CANT_INGRESOS; i++) {
            let fila = {"servicio":"Servicio" + i, "costo":i};
            filas.push(fila);
        }
        cargarDatos();
    }
}