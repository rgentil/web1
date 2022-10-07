"use strict";

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
    document.getElementById("btn-menu").addEventListener("click", verMenu);

    function verMenu() {
        document.querySelector(".barra").classList.toggle("barraVisible");
    }

    window.onload = (event) => {
        document.querySelector("#inicio").addEventListener("click", (event) => push(event));
        document.querySelector("#precio").addEventListener("click", (event) => push(event));
        document.querySelector("#contacto").addEventListener("click", (event) => push(event));
        /*
        window["inicio"].addEventListener("click", (event) => push(event));
        window["precio"].addEventListener("click", (event) => push(event));
        window["contacto"].addEventListener("click", (event) => push(event));
        */
    }

    function push(event){
        let id = event.target.id;
        select_tab(id);
        document.title = id;
        load_content(id);
        window.history.pushState({id},`${id}`, `/page/${id}`);
    }

    function select_tab(id){
        /*Remuevo de todos la clase seleccionado*/
        document.querySelectorAll(".route").forEach((item) => item.classList.remove("seleccionado"));
        /*al del id le pongo el seleccionado*/
        document.querySelectorAll("#"+id).forEach((item) => item.classList.add("seleccionado"));
    }

    async function load_content(id) {
        console.log("Carga " + id);
        let container = document.querySelector("#content");
        container.innerHTML = "Cargando contenido..."
        try {
            let response = await fetch(`${window.location.origin}/${id}.html`);
            if (response.ok){
                let content = await response.text();
                container.innerHTML = content;
                

                /*var div = document.createElement('div');
                div.innerHTML = s;
                var scripts = div.getElementsByTagName('script');
                var i = scripts.length;
                while (i--) {
                scripts[i].parentNode.removeChild(scripts[i]);
                }
                return div.innerHTML;
                */

                let claseScrip = document.querySelectorAll(`.clase_${id}`);
                
                //if (claseScrip.length == 0 && id != "inicio"){
                if (id != "inicio"){
                    let fileRef = document.createElement('script');
                    fileRef.setAttribute("text","text/javascript");
                    fileRef.setAttribute("src",`../js/${id}.js`);
                    fileRef.setAttribute("class",`clase_${id}`);
                    //fileRef.setAttribute("onreadystatechange",`iniciar${id}`);
                    //fileRef.setAttribute("onload",`iniciar${id}`);
                    document.getElementsByTagName("body")[0].appendChild(fileRef);
                }
            }
            else{
                container.innerHTML = "Error";            
            }    
        } catch (error) {
            container.innerHTML = error; 
        }
        
    }

    window.addEventListener("popstate", (event) => {
        //tomo el estado anterior para moverse atras o adelante.
        let estateId = event.state.id;
        console.log("stateId = " + estateId);
        select_tab(estateId);
        load_content(estateId);
    })

}