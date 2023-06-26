
const search = location.search;
const params = new URLSearchParams(search);
console.log(params)
const id = params.get("id");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(data => {
    console.log(data)
    const eventoEncontrado = data.events.find((evento) => evento.name.replace(/ /g, "") == id);
    const detailsCard = document.getElementById(`detailsCard`);
    detailsCard.innerHTML = eventoSeleccionado(eventoEncontrado);
})
.catch((err) => console.log(err));

function eventoSeleccionado(eventoEncontrado){
    return `<div class="row g-0 m-3 align-items-center ">
                <div class="col-12 col-md-6 d-flex justify-content-center">
                <img  class="col-5" src="${eventoEncontrado.image}" alt="${eventoEncontrado.category}">
                </div>
                <div class="col-12 col-md-6">
                    <div class="card-body">
                        <h3 class="text-white fw-bolder" style="height: 4rem;">${eventoEncontrado.name}</h3>
                        <p class="text-white">${eventoEncontrado.date}</p>
                        <p class="text-white">${eventoEncontrado.category}y</p>
                        <p class="text-white">${eventoEncontrado.place}</p>
                        <p class="text-white">${eventoEncontrado.capacity}</p>
                        <p class="text-white">${eventoEncontrado.assistance}</p>
                        <p class="text-white">${eventoEncontrado.estimate}</p>
                        <p class="text-white">${eventoEncontrado.price}</p>
                    </div>
                </div>
            </div>
    `
}
