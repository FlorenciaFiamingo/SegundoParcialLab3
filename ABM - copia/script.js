import { Anuncio_Auto } from "./datos.js";
//LOCAL STORAGE
//const data =JSON.parse(localStorage.getItem("lista")) || [];
var data = [];
var idGlobal;

window.addEventListener("DOMContentLoaded", ()=>{

    document.forms[0].addEventListener("submit", handlerSubmit);
    document.addEventListener("click", handlerClick);
    /*var btnProm = document.getElementById("btnPromedio");
    btnProm.addEventListener("click", obtenerPromedio);*/
    getDatosAjax();
   // (document.getElementById("precioOcultar")).addEventListener("change", filtroCheck);
});
/*
function obtenerPromedio(){
    var nuevoArray = data.map(()=>{
        for(let i in data){
            console.log(data[i]);
            var dat = data[i];
        }
    });

}
*/
function filtroCheck(){
    var precioOcultar = document.getElementById("precioOcultar");
    var puertasOcultar = document.getElementById("puertasOcultar");
    var kmOcultar = document.getElementById("kmOcultar");
    var potenciaOcultar = document.getElementById("potenciaOcultar");
    
/*    var precio = document.getElementsByName("precio");
    var puertas = document.getElementsByName("puertas");
    var kilometros = document.getElementsByName("kilometros");
    var potencia = document.getElementsByName("potencia");*/

   // var nuevoArray = [];

    if(precioOcultar.checked){
        document.setAttribute("class", "ocultar");
        }

    return retorno;
        
}


function handlerOcultarMostrarDiv(){
    const divForm = document.getElementById("divForm");
    if(divForm.classList.contains("ocultoDiv")){
       mostrarDiv(); 
       console.log(document.getElementsByClassName("ocultoDiv"));
    }else{
        ocultarDiv();
        console.log("entró");
    }
}
function ocultarDiv(){
    document.getElementById('divForm').setAttribute("class", "ocultoDiv");

}
function mostrarDiv(){
    document.getElementById('divForm').setAttribute("class", "visible");
}
function limpiarFormulario(frm){
    frm.reset();
    document.getElementById("btnEliminar").setAttribute("class","oculto");
    document.getElementById("btnSubmit").value = "Alta";
    document.forms[0].id.value = "";
}
function handlerSubmit(e){
    e.preventDefault();
    const frm = e.target;
    
    if(frm.id.value){
        const editDato = new Anuncio_Auto(parseInt(frm.id.value), frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.kilometros.value, frm.potencia.value);
        console.log(editDato);
        if(confirm("Confirmar modificación?")){
            updateDatosAjax(editDato);
    
        }

    }else{
        const nuevoDato = new Anuncio_Auto(Date.now(), frm.titulo.value, frm.transaccion.value, frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.kilometros.value, frm.potencia.value);
            console.log(nuevoDato);                
           // altaDatoAjax(nuevoDato);
           postDatosFetch(nuevoDato);
    }
}

const createSpinner = ()=>{
    const spinner = document.createElement('img');
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "Imagen Spinner");
    return spinner;
}

function almacenarDatos(d){
    //localStorage.setItem("lista", JSON.stringify(d));
    handlerLoadList();
}
function modificarDato(p){
    let index = data.findIndex((d)=>{
        return d.id == p.id;
    });

    data.splice(index, 1, p );
    almacenarDatos(data);
}

function renderizarLista(lista, contenedor){
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }
    if(lista){
    contenedor.appendChild(lista);
    }
}

function crearTabla(items){
    //filtroCheck(items);
    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    //tabla.setAttribute("id", "border:1px solid black");
    return tabla;
}

function crearThead(item){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    for (const key in item){
        if(key !== "id"){
            const th = document.createElement("th");
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            tr.appendChild(th);
         }

        }
        thead.appendChild(tr);
    return thead;
}

function crearTbody(item){
    const tbody = document.createElement("tbody");

    item.forEach(item=>{
        const tr = document.createElement("tr");

        for(const key in item){

            if(key === "id"){
                tr.setAttribute("data-id", item[key]);
            }else{
               // tr.setAttribute("data-idcol", item[key]);

                const td = document.createElement("td");
                td.textContent = item[key];
                tr.appendChild(td); 

                if(key === "precio"){
                    td.setAttribute("data-precio", item[key]);

                }else if( key === "puertas"){
                    td.setAttribute("data-precio", item[key]);

                }else if (key === "potencia"){
                    td.setAttribute("data-potencia", item[key]);

                }else if(key === "kilometros"){
                    td.setAttribute("data-km", item[key]);

                }else if(key === "transaccion"){
                    td.setAttribute("data-trans", item[key]);

                }
            }
        }
        tbody.appendChild(tr);
    });
    
    return tbody;
}

function handlerClick(e){

    if(e.target.matches("td")){
       const _id = parseInt(e.target.parentNode.dataset.id);
       idGlobal = _id;
       console.log(_id);
       cargarFormulario(_id);
       document.getElementById("divForm").setAttribute("class","visible");

   }else if(e.target.matches("#btnEliminar")){
        if(confirm("Confirmar eliminación?")){
            //deleteDatoAjax(idGlobal);
            deleteDatosFetch(idGlobal);
            console.log(idGlobal);
        }
   }
}

function cargarFormulario(id){
    let dato = null;
    dato = data.filter(d=> d.id === parseInt(id))[0];

    const {titulo, transaccion, descripcion, precio, puertas, kilometros, potencia} = dato;

    const frm = document.forms[0];
    frm.titulo.value = titulo;
    frm.transaccion.value = transaccion;
    frm.descripcion.value = descripcion;
    frm.precio.value = precio;
    frm.id.value = id;
    frm.puertas.value = puertas;
    frm.kilometros.value = kilometros;
    frm.potencia.value = potencia;

    document.getElementById("btnSubmit").value  = 'Modificar';
    document.getElementById("btnEliminar").setAttribute("class", "visible");
}

const postDatosFetch = (dato)=>{
    document.querySelector(".spinner").appendChild(createSpinner());

    const options = {
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dato)
    }

    fetch("http://localhost:5000/datos", options)
    .then((res)=>{
        console.log(res);
        return res.ok? res.json(): Promise.reject
        (res);
    })
    .then((data)=>{
        console.log(data);

    })
    .catch(err=>{
        console.error(`Error: ${err.status}: ${err.statusText}`);
    })
    .finally(()=>{
        document
        .querySelector(".spinner")
            .removeChild(
                document.querySelector(".spinner").firstElementChild
                );

    });
}
/*
const altaDatoAjax = (dato)=>{
    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
  //  document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
               // renderizarLista(crearTabla(data),document.getElementById("divLista"));
            }
            else{
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
       //     document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }

    // Abrir petición
    xhr.open("POST", "http://localhost:5000/datos");
    
    // Settear cabecera
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8"); 

    // Enviar petición
    xhr.send(JSON.stringify(dato));
    console.log(dato);
}
*/
const getDatosAjax = ()=>{

    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
  //  document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
                renderizarLista(crearTabla(data),document.getElementById("divLista"));

            }
            else{
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }

          //  document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }

    // Abrir petición
    xhr.open("GET", "http://localhost:5000/datos");

    // Enviar petición
    xhr.send();


}
/*
const deleteDatoAjax = (id)=>{

    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    //document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
         //   document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }
    // Abrir petición
    xhr.open("DELETE", `http://localhost:5000/datos/${id}`);
    
    // Enviar petición
    xhr.send();
}

*/

const deleteDatosFetch = (id)=>{
    document.querySelector(".spinner").appendChild(createSpinner());

    const options = {
        method : "DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }

    fetch("http://localhost:5000/datos/" +id, options)
    .then((res)=>{
        console.log(res);
        return res.ok? res.json(): Promise.reject
        (res);
    })
    .then((data)=>{
        console.log(data);

    })
    .catch(err=>{
        console.error(`Error: ${err.status}: ${err.statusText}`);
    })
    .finally(()=>{
        document
        .querySelector(".spinner")
            .removeChild(
                document.querySelector(".spinner").firstElementChild
                );

    });
}


const updateDatosAjax = (dato)=>{

    // Instanciar el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    document.querySelector(".spinner").appendChild(createSpinner());

    // Asignar un handler para la petición
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 299){
                data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                const statusText = xhr.statusText || "Ocurrió un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
            document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
        }
    }

    // Abrir petición
    xhr.open("PUT",`http://localhost:5000/datos/${dato.id}`);
    
    // Settear cabecera
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf8"); //mime types

    // Enviar petición
    xhr.send(JSON.stringify(dato));
}


