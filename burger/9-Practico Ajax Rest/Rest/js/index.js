"use strict"

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    const url = "https://60be7ff7d03b43001792c8ed.mockapi.io/api/usuarios";
    //por que la declara como const?
    const lista = document.querySelector("#lista_nombres");
    let resultado = document.querySelector("#p-resultado");
    resultado.innerHTM = '';

    let id = 0; //Para borrar el ultimo usuario de la lista.

    async function cargarURL() {
        lista.innerHTML = '';
        try {
            let res = await fetch(url); //GET url
            if (res.ok) {
                let json = await res.json(); //Texto json a objeto
                //console.log(json);
                for (const usuario of json) {
                    let nombre = usuario.nombre;
                    let numero = usuario.numero;
                    id = usuario.id;//al final del for tengo el id del ultimo usuario de la lista.
                    lista.innerHTML += `<ul> ${nombre} - ${numero}</ul>`;
                }
            } else {
                console.log("Error de conexion");
            }
        } catch (error) {
            console.log(error);
        }
    }
    cargarURL();

    let btn_agregar = document.querySelector("#btn-agregar");
    btn_agregar.addEventListener("click", agregar);

    async function agregar() {
        resultado.innerHTM = "";
        let nombre = document.querySelector("#id_nombre");
        let numero = document.querySelector("#id_numero");

        let usuario = {
            "nombre": nombre.value,
            "numero": numero.value
        };
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(usuario)
            });

            if (res.status === 201) {
                resultado.innerHTML = `Usuario ${nombre.value} - ${numero.value} Creado con sexito!`;
                nombre.value = "";
                numero.value = "";
                cargarURL();
            } else {
                resultado.innerHTML = `No se pudo crear ${nombre.value} - ${numero.value} :( `;
            }
        } catch (error) {
            console.log(error);
        }
    }

    document.querySelector("#btn-borrarUltimo").addEventListener("click", borrarUltimo);
    async function borrarUltimo() {
        try {
            //"https://60be7ff7d03b43001792c8ed.mockapi.io/api/usuarios/2"
            let res = await fetch(`${url}/${id}`, {
                "method": "DELETE"
            });

            if (res.status === 200) {
                resultado.innerHTML = `Usuario id = ${id} fue Eliminado con sexito!`;
                cargarURL();
            } else {
                resultado.innerHTML = `No se pudo eliminar id ${id} :( `;
            }
        } catch (error) {
            console.log(error);
        }
    }

    document.querySelector("#btn-modificarUltimo").addEventListener("click",modificarUltimo);
    async function modificarUltimo() {
        resultado.innerHTM = "";
        let nombre = document.querySelector("#id_nombre");
        let numero = document.querySelector("#id_numero");

        let usuario = {
            "nombre": nombre.value,
            "numero": numero.value
        };
        try {
            //"https://60be7ff7d03b43001792c8ed.mockapi.io/api/usuarios/2"
            let res = await fetch(`${url}/${id}`, {
                "method": "PUT",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(usuario)
            });

            if (res.status === 200) {
                resultado.innerHTML = `Usuario id = ${id} fue Modificado con sexito!`;
                nombre.value = "";
                numero.value = "";
                cargarURL();
            } else {
                resultado.innerHTML = `No se pudo modificar id ${id} :( `;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //COMIENZO PRACTICO AJAX - REST

    const urlA = "https://jsonplaceholder.typicode.com/posts";
    const urlB = "https://web-unicen.herokuapp.com/api/groups/ejemplos/nombres";

    let listaA = document.querySelector("#url_a");
    listaA.innerHTML = "";

    async function cargarUrlA() {
        try {
            let res = await fetch(urlA);
            if (res.ok) {
                let json = await res.json();
                //console.log (json);
                for (const objeto of json) {
                    //console.log(objeto);
                    let userId = objeto.userId;
                    let id = objeto.id;
                    let title = objeto.title;
                    let body = objeto.body;
                    listaA.innerHTML += `<li>
                                            <h1>Usuario Id = ${userId} Id = ${id}</h1> 
                                            <h2>${title}</h2>
                                            <p>${body}</p>
                                        </li>`;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    cargarUrlA();

    let listaB = document.querySelector("#url_b");
    listaB.innerHTML = '';

    async function cargarUrlB() {
        try {
            let res = await fetch(urlB);
            if (res.ok) {
                let json = await res.json();
                let status = json.status;
                let nombres = json.nombres;
                listaB.innerHTML += `<h2>Status actual = ${status} </h2>`;
                for (const objeto2 of nombres) {
                    let _id = objeto2._id;
                    let groups = objeto2.groups;
                    let thingtype = objeto2.thingtype;
                    let thing = objeto2.thing;
                    let dateAdded = objeto2.dateAdded;
                    let __v = objeto2.__v;
                    listaB.innerHTML += `<li>
                                            <h2>_id=${_id} | groups=${groups} | thingType=${thingtype}</h2>    
                                            <h3>things=${thing.nombre}</h3>
                                            <h2>dateAdded=${dateAdded} | __v=${__v}</h2>
                                        </li>`;
                }

            } else {
                console.log("Error a cargar URL B");
            }

        } catch (error) {
            console.log(error);
        }

    }

    cargarUrlB();

}