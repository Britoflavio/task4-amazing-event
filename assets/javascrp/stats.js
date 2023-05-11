let allEvents;
/* console.log(fetch("https://mindhub-xj03.onrender.com/api/amazing")) */
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(data => data.json())
    .then(res=> {
      console.log(res)
      allEvents = res.events;
      let fecha = res.currentDate;
      console.log(allEvents)
      // variables para imprimir tabla
      const pastEvent= allEvents.filter(evento=>evento.date < fecha)
      const upcomingEvent = allEvents.filter(evento => evento.date > fecha)
      /// funcion para imprimir tablas
      function imprimirTabla(){
        return `<table>
        <thead>
            <tr>
                <th colspan="3">Event statistics</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="color-dark">Events with the highest percentage of attendance</td>
                <td>Events with the lowest percentage of attendance</td>
                <td>Event with larger capacity</td>
            </tr>
            <tr>
                <td>${eventMaxAssistance(pastEvent)}</td>
                <td>${eventMinAssistance(pastEvent)}</td>
                <td>${eventMaxCapacity(allEvents)}</td>
            </tr>
        </tbody>

        <thead>
            <tr>
                <th colspan="3">Upcoming events statistics by category</th>
            </tr>
        </thead>
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
        </tr>
        <tbody id="upcomingEvent">

        </tbody>
        
        <thead>
            <tr>
                <th colspan="3">Past events statistics by category</th>
            </tr>
        </thead>
        <tr>
            <td>Categories</td>
            <td>Revenues</td>
            <td>Percentage of attendance</td>
        </tr>
        <tbody id="pastEvent">

        </tbody>
    </table>`
      }
    const tableElement = document.getElementById("tableEvents")
    tableElement.innerHTML = imprimirTabla();

// funciones para calcular los ingresos y porcentaje de asistencia de eventos futuros y pasados

function allStatics(array){
  let arrayStatics= array.map((e)=>{
    console.log((e.assistance ? e.assistance : e.estimate)* 100/e.capacity)
    return {
      categoria : e.category,
      revenues : e.price * (e.assistance ? e.assistance : e.estimate ),
      porcentajeAsist: (e.assistance ? e.assistance : e.estimate)* 100/e.capacity
    }
  })
  return arrayStatics
}


//variables para guardar estadisticas futuras y pasados reptidas

let upcomingStatics = allStatics(upcomingEvent)
let pastStatics = allStatics(pastEvent)
//funcion para no repetir estadisticas

function finalStatics(arrayOrigin, arrayStatics){
  let arrayFilter = [...new Set(arrayOrigin.map((evento)=>evento.category))].map(categoria=>{
    
    let aux = arrayStatics.filter(elementto => elementto.categoria == categoria)
    console.log(aux)
    let acumulado={categoria : categoria, revenues: 0,porcentaje :0,cantidad : 0}
   /*  console.log(acumulado) */
    for (let iterator of aux){
      
      acumulado.revenues += iterator.revenues
      acumulado.porcentaje += iterator.porcentajeAsist
      acumulado.cantidad ++

    }
    acumulado.porcentaje = acumulado.porcentaje/acumulado.cantidad
    return acumulado
  })
  return arrayFilter
}

let upcomingStaticsFinal= finalStatics(upcomingEvent,upcomingStatics)
console.log(upcomingStaticsFinal)
let pastEventsFinal = finalStatics(pastEvent, pastStatics)

//contenedores para imprimir talbe

const upcomingPrint = document.getElementById("upcomingEvent")
const pastPrint = document.getElementById("pastEvent")

//funcion para imprimir tabla en cada seccion up y past
function tableStatics(array,place){
console.log(array,place)
const template = array.reduce((acc,act)=>{
  return acc+ `
  <td>${act.categoria}</td>
  <td>$${act.revenues}</td>
  <td>${act.porcentaje.toFixed(2)}%</td>
  </tr>
  `
},``)
place.innerHTML= template
}
tableStatics(upcomingStaticsFinal,upcomingPrint)
/* console.log(tableStatics(upcomingStaticsFinal,upcomingPrint)) */
tableStatics(pastEventsFinal,pastPrint)
})
.catch(err => console.log(err));

function eventMaxAssistance(array){
  let mayorAsistencia = {nombre: "",asistencia: 0};

  array.forEach((a)=>{
    const asistencia= (a.assistance*100) / a.capacity;
    if(asistencia > mayorAsistencia.asistencia){
      mayorAsistencia.nombre = a.name;
      mayorAsistencia.asistencia=asistencia;
    }
  });
  return `${mayorAsistencia.nombre} : ${mayorAsistencia.asistencia.toFixed(1)}%`
}

function eventMinAssistance(array){
  let menorAsistencia = {nombre: "",asistencia: 100};
  array.forEach((a)=>{
    const asistencia = (a.assistance*100) / a.capacity;
    if(asistencia < menorAsistencia.asistencia){
      menorAsistencia.nombre = a.name;
      menorAsistencia.asistencia= asistencia;
    }
  });
  return `${menorAsistencia.nombre} : ${menorAsistencia.asistencia.toFixed(1)}%`
}

function eventMaxCapacity(array){
  let mayorCapacidad = {nombre: "",capacidad: 0 };

  array.forEach((a)=>{
    const capacidad = a.capacity;
    if(capacidad > mayorCapacidad.capacidad){
      mayorCapacidad.nombre = a.name;
      mayorCapacidad.capacidad = capacidad;
    }
  });
  return`${mayorCapacidad.nombre} : ${mayorCapacidad.capacidad.toFixed(0)} capacity`;
}
