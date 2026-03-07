
/* JavaScript code for managing students in My Amauta application */





let alumnos = JSON.parse(localStorage.getItem("alumnos"))||[/*array de estudiantes*/
    ]

let asistencias = JSON.parse(localStorage.getItem("asistencias"))||[/*array de asistencia*/
    ]
    

let alumnoId = alumnos.length > 0
    ? alumnos[alumnos.length - 1].id + 1
    : 1 //id autoaumentable para cada alumno nuevo usando el id del ultimo alumno en el array +1 o 1 si no hay alumnos


let grados = [
 "Tercero",
 "Cuarto",
 "Quinto",
 "Sexto"
]




function cargarGrados() {

 const select = document.getElementById("selectGrado")

 select.innerHTML = ""

 for (let grado of grados) {

  const option = document.createElement("option")

  option.value = grado
  option.textContent = grado

  select.appendChild(option)

 }

}

cargarGrados()


document.getElementById("inputFechaInicio")
.addEventListener("change", function(){

  const fechaInicio = this.value
  localStorage.setItem("fechaInicio", fechaInicio)

})

document.getElementById("inputFechaFin")
.addEventListener("change", function(){

  const fechaFin = this.value
  localStorage.setItem("fechaFin", fechaFin)

})


function cargarFechasGuardadas(){

  const fechaInicio = localStorage.getItem("fechaInicio")
  const fechaFin = localStorage.getItem("fechaFin")

  if(fechaInicio){
    document.getElementById("inputFechaInicio").value = fechaInicio
  }

  if(fechaFin){
    document.getElementById("inputFechaFin").value = fechaFin
  }

}


cargarFechasGuardadas()




                                    /* FUNCION DE NAVEGACION DE FECHAS */
document.getElementById("diaAnterior").addEventListener("click", function(){ //Agrega un event listener al boton de diaAnterior para cambiar la fecha seleccionada al dia anterior y actualizar la lista de alumnos

  const input = document.getElementById("inputFecha")
  const fecha = new Date(input.value)

  fecha.setDate(fecha.getDate() - 1)

  input.value = fecha.toISOString().split("T")[0]

  renderAlumnos()
})


document.getElementById("diaSiguiente").addEventListener("click", function(){

  const input = document.getElementById("inputFecha")
  const fecha = new Date(input.value)

  fecha.setDate(fecha.getDate() + 1)

  input.value = fecha.toISOString().split("T")[0]

  renderAlumnos()
})




                                        /*mostrar fecha */
  function mostrarFechaBonita(fecha){

  const fechaObj = new Date(fecha)

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  let texto = fechaObj.toLocaleDateString("es-ES", opciones)

  return texto.charAt(0).toUpperCase() + texto.slice(1)
  

}

                                              /* FUNCION DE SELECCION DE FECHA */
    
    document.getElementById("inputFecha")
  .addEventListener("change", renderAlumnos) /*Escucha el cambio en el input de fecha y llama a la funcion renderAlumnos para actualizar la lista de alumnos*/

                                              /* FUNCION DE SELECCION DE GRADO */

  document
.getElementById("selectGrado")
.addEventListener("change", renderAlumnos) /*Escucha el cambio en el select de grado y llama a la funcion renderAlumnos para actualizar la lista de alumnos segun el grado seleccionado*/

                                                    /* AGREGAR ALUMNOS*/

/*Busca el boton de agregar en html y le asigna una funcion al hacer click*/
document.getElementById("botonAgregar").addEventListener('click', agregarAlumno)

function agregarAlumno() { /*funcion para agregar alumnos */
    
    const nombres = document.getElementById("inputNombres").value .trim() /*Busca el elemento InputNombres en el html y extrae sus datos de ahi */

    const apellidos = document.getElementById("inputApellidos").value .trim() /*Busca el elemento InputApellidos en el html y extrae sus datos de ahi */

    const grado = document.getElementById("selectGrado").value /*Busca el elemento selectGrado en el html y extrae sus datos de ahi */

    if (nombres === '' || apellidos === '') { /*Comprueba si los campos nombre y apellidos ademas de la fecha estan vacios */

        alert('Por favor, complete todos los campos.(Nombres, Apellidos y Fecha)')
        return
    }



const alumno = { /*Crea el object del alumno */
    id: alumnoId++, /*id autoaumentable */
    nombres: nombres, /*extrae datos de la var nombres */
    apellidos: apellidos, /*extrae datos de la var apellidos */
    grado: grado /*extrae datos de la var grado */
    
}
 
 alumnos.push(alumno)  /*al array alumnos se le agrega el object de alumno*/

 /*Guarda los arrays actualizados en localStorage como strings JSON */
    localStorage.setItem("alumnos", JSON.stringify(alumnos))

 /*Define nuevamente los valores ingresados en los campos como NULL una ves que se extrayeron los datos */
 document.getElementById("inputNombres").value = ''
 document.getElementById("inputApellidos").value = ''

  /*llama a la funcion render alumnos */
  renderAlumnos()
    
}


function setFechaHoy() { //Funcion para establecer la fecha actual en el input de fecha
  const hoy = new Date().toISOString().split("T")[0] //Obtiene la fecha actual en formato YYYY-MM-DD
  document.getElementById("inputFecha").value = hoy //Establece el valor del input de fecha como la fecha actual
}

setFechaHoy()
renderAlumnos()

                                                    /* funcion ACTUALIZAR LISTA ALUMNOS*/ 

function renderAlumnos() { /*funcion para mostrar los alumnos en la lista */

const listaAlumnos = document.getElementById("listaAlumnos") /*Busca el elemento listaAlumnos en el html */

const fechaSelect = document.getElementById("inputFecha").value /*Busca el elemento inputFecha en el html y extrae sus datos de ahi */
const fechaSpan = document.getElementById("fechaSel") /*Busca el elemento fechaSel en el html */
const gradoSeleccionado =
document.getElementById("selectGrado").value






if (fechaSelect || gradoSeleccionado) { //
    fechaSpan.textContent = `${mostrarFechaBonita(fechaSelect)} - ${gradoSeleccionado} ` /*Muestra la fecha seleccionada y el grado seleccionado en el span de fechaSel usando la funcion mostrarFechaBonita para darle formato a la fecha */
  } else {
    fechaSpan.textContent = "...  "
    
  }

  


    listaAlumnos.innerHTML = '' /*Limpia la lista de alumnos para evitar duplicarla */

    let contador = 0 

    for (let alumno of alumnos) {/*recorre cada object "alumno" ingresado en el array alumnos */

        if (alumno.grado !== gradoSeleccionado) {
         continue
        }

        contador++ /*contador para mostrar el total de alumnos en el grado seleccionado*/
        const li = document.createElement("li") /*Crea un elemento de lista <li>  */
        const inputAsis = document.createElement("input") 
        const details = document.createElement("input") //Crea un elemento de input para mostrar los detalles del alumno al hacer click en el nombre del alumno
        const texto = document.createElement("span") 

                                                  /*contenidos */
        texto.textContent = `• ${alumno.apellidos.toUpperCase()} ${alumno.nombres} ` /*Define el contenido de texto con el id, nombres y apellidos del alumno actual */
        inputAsis.type = "checkbox" /*Define el tipo de input como checkbox */
          details.type = "button" //Define el tipo de input como button
        details.value = "Detalles" //Define el valor del button como "Detalles"
        details.classList.add("boton-detalles") //Agrega la clase "boton-detalles" al button para aplicar estilos




                                              /*FUncion de Fecha */
const alumnoAsist = asistencias.find(a => a.alumnoId === alumno.id && a.fecha === fechaSelect) /*Busca en el array asistencias si existe un registro de asistencia para el alumno actual en la fecha seleccionada*/
        inputAsis.checked = alumnoAsist ? alumnoAsist.asistio : false /*Si se encuentra un registro de asistencia, establece el estado del checkbox según el valor de "asistio", de lo contrario, lo establece como falso (no asistio)*/


       /*Agrega un event listener al checkbox para actualizar el valor del object alumno y guardar en localStorage cuando cambie su estado */ inputAsis.addEventListener("change", function() { //Esciucha el cambio del evento cuando en `input` haya algun cambio
            const fechaSelect = document.getElementById("inputFecha").value //Extrae el valor actual del inputFecha
        
          if (!fechaSelect) { //Comprueba si el valor de fechaSelect esta vacio
            alert("Por favor, seleccione una fecha antes de marcar la asistencia.") 
            this.checked = false //Desmarca el checkbox
            return //Sale de la funcion
          }
          
          const asisExist = asistencias.find(a => a.alumnoId === alumno.id && a.fecha === fechaSelect) //Busca el indice del registro de asistencia para el alumno actual en la fecha seleccionada

          if (asisExist) { 
            asisExist.asistio = this.checked //Si se encuentra el registro, actualiza el valor de "asistio" segun el estado del checkbox
          } else {
            asistencias.push({ //Si no se encuentra el registro, crea uno nuevo y lo agrega al array asistencias
              alumnoId: alumno.id,
              fecha: fechaSelect,
              asistio : this.checked //Asigna el valor del checkbox al campo "asistio"
            })
          }

            localStorage.setItem("asistencias", JSON.stringify(asistencias)) /*Guarda el array asistencias actualizado en localStorage como string JSON */
        })


                                                  /* FUNCION DE DETALLES DEL ALUMNO */

        
        details.addEventListener("click", function() { /*Agrega un event listener al button de detalles para mostrar una alerta con los detalles del alumno al hacer click */

        const fechaInicio = document.getElementById("inputFechaInicio").value
  const fechaFin = document.getElementById("inputFechaFin").value

  if (!fechaInicio || !fechaFin) {
    alert("Seleccione fecha inicio y fin")
    return
  }

  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)

 const diasTotal = contarDiasClase(fechaInicio, fechaFin)

  const registrosAlumno = asistencias.filter(a =>
    a.alumnoId === alumno.id &&
    a.fecha >= fechaInicio &&
    a.fecha <= fechaFin &&
    a.asistio === true
  )

  const asistio = registrosAlumno.length
  const falto = diasTotal - asistio

  alert(
`
Periodo:
${fechaInicio.split("-").reverse().join("/")} → ${fechaFin.split("-").reverse().join("/")} 
ALUMNO: ${alumno.apellidos} ${alumno.nombres} 
GRADO: ${alumno.grado}
CLASES TOTALES: ${diasTotal}
ASISTENCIAS: ${asistio}
FALTAS: ${falto}`
  )       

        })
          
        li.appendChild(inputAsis)  /*Agrega el elemento hijo "input" al elemento padre "li"*/
        li.appendChild(texto)  /*Agrega el elemento hijo "texto" al elemento padre "li"*/
        li.appendChild(details)  /*Agrega el elemento hijo "details" al elemento padre "li"*/

        listaAlumnos.appendChild(li) /*Agrega el elemento hijo "li" al elemento padre "listaAlumnos"*/
        
    }



    

    document.getElementById("totalAlumnos").textContent = contador /*cambia el contenido de totalAlumnos a la cantidad objects en el array Alumnos, osea la cantidad de alumnos*/

}

                                                    /* FUNCION DE DETALLES DEL ALUMNO */
function contarDiasClase(inicio, fin) {

  let fechaActual = new Date(inicio)
  const fechaFinal = new Date(fin)

  let diasClase = 0

  while (fechaActual <= fechaFinal) {

    const dia = fechaActual.getDay()

    if (dia !== 0 && dia !== 6) {
      diasClase++
    }

    fechaActual.setDate(fechaActual.getDate() + 1)
  }

  return diasClase
}



function vaciarAlumnos() {
    localStorage.removeItem("alumnos")
    alumnos = []
    alumnoId = 1
    renderAlumnos()
    alert("Alumnos eliminados")
}

function vaciarAsistencias() {
    localStorage.removeItem("asistencias")
    asistencias = []
    renderAlumnos()
    alert("Asistencias eliminadas")
}

function resetDatos(){ //Funcion para reiniciar todos los datos de alumnos y asistencias con una confirmacion y contraseña para evitar borrados accidentales

  const password = prompt("Ingrese la contraseña para borrar los datos")

  if(password === "0313"){   // aquí pones la contraseña

    if(confirm("¿Seguro que deseas borrar todos los datos?")){

      localStorage.clear()
      location.reload()
      alert("Datos reiniciados")

    }

  } else {

    alert("Contraseña incorrecta")

  }

}

renderAlumnos() /*Llama a la funcion renderAlumnos para mostrar la lista de alumnos al cargar la pagina */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => {
      console.log("Service Worker registrado");
    });
}