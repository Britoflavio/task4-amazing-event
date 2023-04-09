const contenedor= document.getElementById(`contenedor-allEvents`)
const allEvent= eventsFilter (data.allEvents)
let cardAll= ``

function filterCards(allEventUno){
    return `<article class="card border-dark col-10 col-md-3 col-xl-3">
                <img src="${allEventUno.image}" class="card-img-top h-50 p-2" alt="..." />
                <div class="card-body">
                    <h5 class="card-title text-black">${allEventUno.name}</h5>
                    <p class="card-text text-black">
                    ${allEventUno.description}
                    </p>
                <div class="card-footer d-flex justify-content-evenly">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">$${allEventUno.price}</li>
                    </ul>
                    <a href="./details.html" class="btn  btn-dark">More info</a>
                </div>
                </div>
            </article>`
}
function eventsFilter(arrayEvents) {
    const dateFecha = data.dateNow
    const filterDos = []
    for (let allEventUno of arrayEvents) {
        if (allEventUno.date < dateFecha) { 
           filterDos.push(allEventUno)
        }
    }
    return filterDos
}
for (let filterCardsDos of allEvent) {
    cardAll += filterCards(filterCardsDos)
}
contenedor.innerHTML= cardAll