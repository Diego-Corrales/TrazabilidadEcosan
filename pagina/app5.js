

/* ARRAY DE OBRAS REALIZADAS TOMADO DE UN JSON Y CARGADO MEDIANTE UN FETCH */

const pokemonContainer = document.querySelector('#pokemon')
const btnSiguiente = document.querySelector('#btnSiguiente')
const btnAnterior = document.querySelector('#btnAnterior')
        
const lista_Obras2021 = document.querySelector('#obras2021')


fetch('./data.json')
    .then((resp) => resp.json())
    .then((data) => {
        // renderizar etc.
        console.log(data)

        data.forEach((post) => {

                const li = document.createElement('li')
                li.innerHTML = `
                    <h4>${post.obra}</h4>
                    <p>Orden de trabajo : ${post.ordendetrabajo}</p>
                    <p>${post.cliente}</p>
                    <img src=${post.imagen} alt="" width="300px">
                    <hr>
                `
        
                lista_Obras2021.append(li)
        })
})


/* TRAZABILIDAD DE PROYECTOS */

const inputTipo = document.querySelector('#input-tipo')
const inputOt = document.querySelector('#input-ot')
const inputCliente = document.querySelector('#input-cliente')
const inputSolicito = document.querySelector('#input-solicito')
const inputFecha = document.querySelector('#input-fecha')
const inputEliminar = document.querySelector ('#input-eliminar')
const btnsubmit = document.querySelector('#btn-submit')
const btnclear = document.querySelector ('#btn-clear')
const btnreload = document.querySelector('#btn-reload')

// const form = document.querySelector('#proy-form')
const proyList = document.querySelector('#listaProyectos')
const loader = document.querySelector('#loader')

/* creo un array de proyectos */

let proyectos = []


/* algoritmo que revisa si hay algun elemento previamente guardado en LS
 y empieza a iterar a partir de ello */
const proyectosEnLS = JSON.parse(localStorage.getItem('proyectos') )

if (proyectosEnLS) {
    proyectos = proyectosEnLS
}


const pedirProductos = (logged) => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            if (logged) {
                resolve(proyectos)
            } else {
                reject("Error de autenticación")
            }
        }, 3000)
    })
}

loader.classList.add('loader-active')

pedirProductos(true)
    .then( (data) => {
        console.log(data)
        productos = data
        proyList.innerHTML = ""

        productos.forEach((proyecto) => {
            const div = document.createElement('div')
            div.innerHTML = `
                    <h4>TIPOLOGIA DE PROYECTO: ${proyecto.tipo}</h4>
                    <h5>ORDEN DE TRABAJO n°: ${proyecto.ot}<h5>
                    <h5>CLIENTE: ${proyecto.cliente}<h5>
                    <h5>PROYECTO SOLICITADO POR: ${proyecto.solicito}<h5>
                    <h5>FECHA DE ENTREGA DE LA OBRA: ${proyecto.fecha}<h5>
            `
        
            proyList.append(div)
        })
    } )
    .catch( (error) => {
        console.log(error)

        proyList.innerHTML = `<p>Hubo un problema: ${error}</p>`
    })
    .finally(() => {
        loader.classList.remove('loader-active')
        
})



/* crea un formula para pushear nuevos proyectos y guardarlos a LS */
const guardarProyecto = () => {
    Swal.fire({
        title: 'Proyecto ingresado correctamente',
        text: 'A continuacion, presione el boton "actualizar"',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        showConfirmButton: false,
        timer: 4000
      })
    
    const valueTipo = inputTipo.value
    const valueOt = inputOt.value
    const valueCliente = inputCliente.value
    const valueSolicito = inputSolicito.value
    const valueFecha = inputFecha.value


    proyectos.push({
        tipo: valueTipo,
        ot: valueOt,
        cliente: valueCliente,
        solicito: valueSolicito,
        fecha: valueFecha,
        
    })

    localStorage.setItem('proyectos', JSON.stringify(proyectos) )

    console.log(proyectos)

    inputTipo.value = ''
    inputOt.value = ''
    inputCliente.value = ''
    inputSolicito.value = ''
    inputFecha.value = ''

     console.log(proyectos)
     proyectos()
}

btnsubmit.addEventListener('click', guardarProyecto)



/* funcion vaciar lista de proyectos */
const vaciarProyectos = () => {
    proyectos.length = 0

    localStorage.setItem('proyectos', JSON.stringify(proyectos)) /* se agrega al local storage */

    Swal.fire({
        title: 'Lista de proyectos eliminada',
        text: 'A continuacion, presione el boton "actualizar"',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        showConfirmButton: false,
        timer: 4000
      })
    
}


btnclear.addEventListener('click', vaciarProyectos)

