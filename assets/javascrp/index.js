const contenedor = document.getElementById(`contenedorallEvents`);
const select = document.getElementById(`checkboxContainer`);
const search = document.getElementById(`search`);
let events;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((data) => data.json())
    .then((res) => {
        console.log(res)
        let allEvent = [];
        for (let event of res.events) {
        allEvent.push(event);
        }
        events = allEvent.filter((event) => event.category);
        crearCheckbox(allEvent, select);
        imprimirCard(allEvent, contenedor);
        search.addEventListener(`keyup`, filtrar);
        select.addEventListener(`change`, filtrar);
    })
    .catch((err) => console.log(err));

function crearCheckbox(events, conteiner) {
    let fn = (events) => events.category;
    let categorias = new Set(events.filter(fn).map(fn));
    categorias.forEach((categoria) => {
        conteiner.innerHTML += ` 
                <ul>
                <li>
                <input name="" id="${categoria}" type="checkbox" value="${categoria}" id=""><label class="" for="${categoria}">${categoria}</label>
                </li> 
                </ul>`;
    });
}

let urlDetails = `./pages/details.html`;

function crearCard(carta, urlDetails) {
    let article = document.createElement(`article`);
    article.classList = `card border-dark col-10 col-md-5 col-xl-3 shadow-lg cardFondo`;
    article.innerHTML = `<img src="${
        carta.image
    }" class="card-img-top h-50 p-2" alt="..." />
        <div class="card-body">
            <h5 class="card-title text-black">${carta.name}</h5>
            <p class="card-text text-black">
            ${carta.description}
            </p>
        <div class="card-footer d-flex justify-content-evenly">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">$${carta.price}</li>
            </ul>
            <a href="${urlDetails}?id=${carta.name.replace(
        / /g,
        ""
    )}" class="btn  btn-dark">Go to</a>
        </div>
        </div>`;
    return article;
}
function imprimirCard(events, conteiner) {
    conteiner.innerHTML = ``;
    if (events.length > 0) {
        let fragment = document.createDocumentFragment();
        events.forEach((carta) =>
        fragment.appendChild(crearCard(carta, urlDetails))
        );
        conteiner.appendChild(fragment);
    } else {
        conteiner.innerHTML = ``;
    }
}

function filtrar() {
    let checked = [
        ...document.querySelectorAll(`input[type="checkbox"]:checked`),
    ].map((ele) => ele.value);
    let filtradoPorCat = events.filter(
        (event) => checked.includes(event.category) || checked.length == 0
    );
    let filtradosPorSearch = filtradoPorCat.filter((event) =>
        event.name.toLowerCase().includes(search.value.toLowerCase())
    );
    imprimirCard(filtradosPorSearch, contenedor);
    console.log(filtradosPorSearch);
}
