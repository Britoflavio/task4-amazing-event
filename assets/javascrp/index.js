const contenedor= document.getElementById(`contenedor-allEvents`)
const allEvent= data.allEvents
const allEventUno= allEvent[4]
let cardAll= ``

function createCards(allEventUno){
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
                    <a href="./pages/details.html" class="btn  btn-dark">Go to</a>
                </div>
                </div>
            </article>`
}
for(let allEventUno of allEvent){
    cardAll += createCards( allEventUno )
 }
contenedor.innerHTML= cardAll