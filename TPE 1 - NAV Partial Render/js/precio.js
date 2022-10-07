"use strict";

/*document.addEventListener("DOMContentLoaded", iniciarPrecio);*/

//function iniciarprecio() {
    
    document.getElementById("p-tabla-nota-aviso").innerHTML = "En ROJO los valores mayores a " + 99;

    mostrarServicios();

    async function mostrarServicios(filtroServicio, filtroCostoDesde, filtroCostoHasta) {
        try {
            let res;
            let URL_SERVICIOS = "https://60be7ff7d03b43001792c8ed.mockapi.io/api/servicios";
            //if (estaFiltrando) {
            if (filtroServicio || filtroCostoDesde || filtroCostoHasta){
                res = await fetch(URL_SERVICIOS);
            } else {
                res = await fetch(`${URL_SERVICIOS}/?p=${document.querySelector("#id-paginado").value}&l=${5}`);
            }

            if (res.ok) {
                let servicios = await res.json();
                document.getElementById("id-boby-servicios").innerHTML = '';

                for (let item of servicios) {

                    /*for (let arg of arguments){
                        console.log(arg);
                        filtro = arg;
                    }*/

                    if ((!filtroServicio || ((item.servicio).toLowerCase()).includes(filtroServicio.toLowerCase()) ) && (!filtroCostoDesde || Number(filtroCostoDesde) <= item.costo) && (!filtroCostoHasta || Number(filtroCostoHasta) >= item.costo)) {
                        /*Se crea un elemento nuevo tr para la nueva fila*/
                        let tr = document.createElement("tr");
                        tr.classList.add("row-servicio");
                        if (item.costo > 99) {
                            tr.classList.add("tabla-valor-superior");
                        }
                        let td = document.createElement("td");
                        td.innerHTML = `${item.id}`;
                        tr.appendChild(td);
                        /*Se crea un elemento td, dato con el servicio y lo agrego a la fila tr*/
                        td = document.createElement("td");
                        td.innerHTML = `${item.servicio}`;
                        tr.appendChild(td);
                        /*Se crea un elemento td, dato con el costo y lo agrego a la fila tr*/
                        td = document.createElement("td");
                        td.innerHTML = `${item.costo}`;
                        tr.appendChild(td);
                        /*Se crea un elemento td, además, se crea el elemento button para editar*/
                        let btnEditar = document.createElement("button");
                        btnEditar.classList.add("btnFila");
                        btnEditar.innerHTML = 'Editar';
                        //btnEditar.name = `Editar${item.id}`;
                        btnEditar.addEventListener("click", (event) => {
                            event.preventDefault;
                            editarFila(item.id, item.servicio);
                        });
                        td = document.createElement("td");
                        td.appendChild(btnEditar);
                        tr.appendChild(td);
                        /*Se crea un elemento td, además, se crea el elemento button para eliminar*/
                        let btnEliminar = document.createElement("button");
                        btnEliminar.classList.add("btnFila");
                        btnEliminar.innerHTML = 'Eliminar';
                        //btnEliminar.name = `Eliminar${item.id}`;
                        btnEliminar.addEventListener("click", (event) => {
                            event.preventDefault;
                            eliminarFila(item.id, item.servicio);
                        });
                        td = document.createElement("td");
                        td.appendChild(btnEliminar);
                        tr.appendChild(td);
                        /*Por último se agrega la fila a la tabla */
                        document.getElementById("id-boby-servicios").appendChild(tr);
                    }
                }
            } else {
                document.getElementById("p-valor-tabla-requerido").innerHTML = 'Error en la conexión';
            }
        } catch (error) {
            document.getElementById("p-valor-tabla-requerido").innerHTML = 'Error en la conexión';
        }
    }

    async function editarFila(id, nombreServicio) {
        let inputServicio = document.getElementById("input-tabla-servicio");
        let inputCosto = document.getElementById("input-tabla-costo");

        if (inputServicio.value == null || inputServicio.value == "") {
            document.getElementById("p-valor-tabla-requerido").innerHTML = "Ingrese descricpión del servicio";
        } else {
            if (inputCosto.value == null || inputCosto.value == "") {
                document.getElementById("p-valor-tabla-requerido").innerHTML = "Ingrese costo para el servicio";
            }
            else {
                try {
                    document.getElementById("p-valor-tabla-requerido").innerHTML = "";
                    let servicio = { "servicio": inputServicio.value, "costo": inputCosto.value };
                    inputServicio.value = "";
                    inputCosto.value = "";
                    let URL_SERVICIOS = "https://60be7ff7d03b43001792c8ed.mockapi.io/api/servicios";
                    let res = await fetch(`${URL_SERVICIOS}/${id}`, {
                        "method": "PUT",
                        "headers": { "Content-type": "application/json" },
                        "body": JSON.stringify(servicio)
                    });
                    if (res.ok) {
                        document.getElementById("p-valor-tabla-requerido").innerHTML = `El servicio ${nombreServicio} fue Modificado con éxito!`;
                        filtrarServicios();
                    } else {
                        document.getElementById("p-valor-tabla-requerido").innerHTML = `No se pudo modificar el servicio ${nombreServicio} :( `;
                    }
                } catch (error) {
                    document.getElementById("p-valor-tabla-requerido").innerHTML = error;
                }
            }
        }
    }

    async function eliminarFila(id, servicio) {
        try {
            let URL_SERVICIOS = "https://60be7ff7d03b43001792c8ed.mockapi.io/api/servicios";
            let res = await fetch(`${URL_SERVICIOS}/${id}`, {
                "method": "DELETE"
            });
            if (res.ok) {
                document.getElementById("p-valor-tabla-requerido").innerHTML = `El servicio ${servicio} fue Eliminado con éxito!`;
                filtrarServicios();
            } else {
                document.getElementById("p-valor-tabla-requerido").innerHTML = `No se pudo eliminar el servicio ${servicio} :( `;
            }
        } catch (error) {
            document.getElementById("p-valor-tabla-requerido").innerHTML = error;
        }
    }

    async function agregarServicio(servicio) {
        try {
            let URL_SERVICIOS = "https://60be7ff7d03b43001792c8ed.mockapi.io/api/servicios";
            let res = await fetch(URL_SERVICIOS, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(servicio)
            });

            if (res.ok) {
                //if (res.status === 200 || res.status === 201) {
                document.getElementById("p-valor-tabla-requerido").innerHTML = `Se creo el servicio ${servicio.servicio} correctamente`;
                filtrarServicios();
            } else {
                document.getElementById("p-valor-tabla-requerido").innerHTML = `No se pudo crear el servicio`;
            }
        } catch (error) {
            document.getElementById("p-valor-tabla-requerido").innerHTML = 'Error en la conexión';
        }

    }

    /*Botón para agregar un nuevo servicio*/
    document.getElementById("btn-agregar-servicio").addEventListener("click", function (event) {
        event.preventDefault();
        let inputServicio = document.getElementById("input-tabla-servicio");
        let inputCosto = document.getElementById("input-tabla-costo");

        if (inputServicio.value == null || inputServicio.value == "") {
            document.getElementById("p-valor-tabla-requerido").innerHTML = "Ingrese descricpión del servicio";
        } else {
            if (inputCosto.value == null || inputCosto.value == "") {
                document.getElementById("p-valor-tabla-requerido").innerHTML = "Ingrese costo para el servicio";
            }
            else {
                document.getElementById("p-valor-tabla-requerido").innerHTML = "";
                let servicio = { "servicio": inputServicio.value, "costo": inputCosto.value };
                inputServicio.value = "";
                inputCosto.value = "";
                agregarServicio(servicio);
            }
        }

    });

    /*Se van a pedir todos los datos e eliminando uno por uno por id*/
    document.getElementById("btn-vaciar-tabla").addEventListener("click", vaciarTabla);
    async function vaciarTabla(event) {
        event.preventDefault();
        try {
            let URL_SERVICIOS = "https://60be7ff7d03b43001792c8ed.mockapi.io/api/servicios";
            let resGET = await fetch(URL_SERVICIOS);
            if (resGET.ok) {
                let servicios = await resGET.json();
                document.getElementById("id-boby-servicios").innerHTML = '';
                document.querySelector("#id-paginado").value = 1;
                for (let item of servicios) {
                    try {
                        let resDelete = await fetch(`${URL_SERVICIOS}/${item.id}`, {
                            "method": "DELETE"
                        });

                        if (resDelete.ok) {
                            document.getElementById("p-valor-tabla-requerido").innerHTML = `Se eliminaron todos los servicios `;
                        } else {
                            document.getElementById("p-valor-tabla-requerido").innerHTML = `No se pudo eliminar los servicios`;
                        }
                    } catch (error) {
                        document.getElementById("p-valor-tabla-requerido").innerHTML = error;
                    }
                }
            }
            else {
                document.getElementById("p-valor-tabla-requerido").innerHTML = 'Error en la conexión para eliminar todos los servicios';
            }
        } catch (error) {
            document.getElementById("p-valor-tabla-requerido").innerHTML = error;
        }
    }

    /*Botón para genere N datos dentro de la tabla*/
    document.getElementById("btn-cant-ingresos").addEventListener("click", generarCantIngresos);
    function generarCantIngresos(event) {
        event.preventDefault();
        /*for (let i = 0; i < 3; i++) {
            let servicio = { "servicio": "Servicio" + i, "costo": i };
            agregarServicio(servicio);
        }*/
        /**Solución que habilitaron Javier y Nacho para que no se repitan los id y tirre error Mockappi*/
        let contador = 3;
        setInterval(() => {
            if (contador > 0) {
                let servicio = { "servicio": "Servicio" + contador, "costo": contador };
                agregarServicio(servicio);
                contador--;
                if (contador===0){
                    clearInterval(this);
                }
            }
        }, 2500);
    }

    /* Funcionalidad para el filtrado de la tabla */
    document.querySelector("#btn-filtrar").addEventListener("click", filtrarServicios);
    function filtrarServicios() {
        let filtroServicio = document.querySelector("#input-filtro-servicio");
        let filtroCostoDesde = document.querySelector("#input-filtro-costo-desde");
        let filtroCostoHasta = document.querySelector("#input-filtro-costo-hasta");
        if (filtroServicio.value || filtroCostoDesde.value || filtroCostoHasta.value) {
            document.querySelector("#id-paginado").value = 1;
        }
        mostrarServicios(filtroServicio.value, filtroCostoDesde.value, filtroCostoHasta.value);
    }

    /* Funcionalidad para limpiar el filtro aplicado y volver a cargar la lista. */
    document.querySelector("#btn-limpiar-filtro").addEventListener("click", (event) => {
        event.preventDefault();
        let filtroServicio = document.querySelector("#input-filtro-servicio");
        let filtroCostoDesde = document.querySelector("#input-filtro-costo-desde");
        let filtroCostoHasta = document.querySelector("#input-filtro-costo-hasta");
        filtroServicio.value = "";
        filtroCostoDesde.value = "";
        filtroCostoHasta.value = "";
        document.querySelector("#id-paginado").value = 1;
        filtrarServicios();
    });

    /*Paginado*/
    document.querySelector("#btn-siguiente").addEventListener("click", () => {
        sumarPagina(1);
    });

    document.querySelector("#btn-anterior").addEventListener("click", () => {
        let pag = document.querySelector("#id-paginado").value;
        if (Number(pag) > 1) {
            sumarPagina(-1);
        }
    })

    function sumarPagina(pagina) {
        let pag = Number(document.querySelector("#id-paginado").value);
        pag += pagina;
        document.querySelector("#id-paginado").value = pag;
        filtrarServicios();
    }

//}