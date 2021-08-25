
const api = 'https://pokeapi.co/api/v2/';

let numberOfPokemons = 51;
const eachPageLimit = 12;
let currentPage = 0;
let page = eachPageLimit * currentPage;
let tempPokemons= 0;

(function () {

    const header = document.createElement('header');
    header.setAttribute('class', 'header');

    const headerContainer = document.createElement('div');
    headerContainer.setAttribute('class', 'header-container');

    const imgLogo = document.createElement('div');
    imgLogo.setAttribute('class', 'img-logo');

    const logo = document.createElement('img');
    logo.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png');
    logo.setAttribute('alt', '');
    logo.setAttribute('class', 'logo');

    imgLogo.append(logo);

    const options = document.createElement('div');
    options.setAttribute('class', 'options');

    const displayOption = document.createElement('div');
    displayOption.setAttribute('class', 'display-options');
    displayOption.innerText = 'Displaying 60 pokemons';

    options.append(displayOption);

    const inputContainer= document.createElement('div');
    inputContainer.setAttribute('class','input-container');

    const inputOptions= document.createElement('input');
    inputOptions.setAttribute('class','input-text');
    inputOptions.setAttribute('type','text');
    inputOptions.setAttribute('placeholder','Enter number of pokemons');
    
    const refreshButton = document.createElement('button');
    refreshButton.setAttribute('class','page-button');
    refreshButton.setAttribute('onclick','refreshData()');
    refreshButton.innerText='Refresh';
    
    inputContainer.append(inputOptions,refreshButton);

    options.append(inputContainer);

    headerContainer.append(imgLogo, options);
    header.append(headerContainer);

    const section = document.createElement('section');
    section.setAttribute('class', 'container');

    document.body.append(header, section);

})();

function displayPokemons(pokemonDetails) {

    const section = document.querySelector('.container');

    const pokemonContainer = document.createElement('div');
    pokemonContainer.setAttribute('class', 'pokemon-container');

    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'img-container');
    imgContainer.style.backgroundColor = randomColor();

    const img = document.createElement('img');
    img.setAttribute('class', 'img');
    img.setAttribute('alt', '');
    img.setAttribute('src', pokemonDetails.sprites.other.dream_world.front_default);

    imgContainer.append(img);
    pokemonContainer.append(imgContainer);

    const pokemonDetailsContainer = document.createElement('div');
    pokemonDetailsContainer.setAttribute('calss', 'pokemon-details');
    pokemonDetailsContainer.style.padding = '20px';

    const pokemonName = document.createElement('div');
    pokemonName.setAttribute('class', 'name');

    const pokemonWeight = document.createElement('div');
    pokemonWeight.setAttribute('class', 'weight');

    const pokemonAbility = document.createElement('div');
    pokemonAbility.setAttribute('class', 'ability');

    const pokemonMoves = document.createElement('div');
    pokemonMoves.setAttribute('class', 'moves');

    pokemonDetailsContainer.append(pokemonName, pokemonWeight, pokemonAbility, pokemonMoves);
    pokemonContainer.append(pokemonDetailsContainer);

    pokemonName.innerText = capitalizeFirstLetter(pokemonDetails.name);
    pokemonWeight.innerHTML = `Weight: <span class="weight-tag"> ${pokemonDetails.weight} lbs </span>`;
    pokemonAbility.innerText = 'Abilities: ';
    pokemonDetails.abilities.forEach((ability) => {
        pokemonAbility.innerHTML += `<span class="ability-tag"> ${ability.ability.name} </span>`;
    })
    pokemonMoves.innerText = 'Moves: '
    for (let i = 0; i < 3; i++) {
        pokemonMoves.innerHTML += `<span class="move-tag"> ${pokemonDetails.moves[i].move.name} </span> `;
    }
    //
    let stringMoves= '';
    for(let i=0;i<pokemonDetails.moves.length;i++) stringMoves+=` ${pokemonDetails.moves[i].move.name}`;
    
    pokemonMoves.innerHTML+= `<span class= "more-moves move-tag">${stringMoves}</span>`;

    section.append(pokemonContainer);

    document.body.append(section);

}

async function getPokemons(limit, offset) {

    const section = document.querySelector('.container');
    section.innerHTML = '';

    try {
        const data = await fetch(`${api}pokemon?limit=${limit}&offset=${offset}`);
        const pokemons = await data.json();
        pokemons.results.forEach((pokemon) => {
            getPokemonDetails(pokemon.url);
        })

    } catch (msg) {
        console.log(msg);
    }

}

async function getPokemonDetails(pokemon) {

    try {
        const data = await fetch(`${pokemon}`);
        const pokemonDetails = await data.json();
        displayPokemons(pokemonDetails);
    } catch (msg) {
        console.log(msg);
    }

}

function updatePage(next) {

    if (typeof (next) == 'number') {
        next = parseInt(next);
        currentPage = next - 1;
    }
    if (next === true) {
        if(page+eachPageLimit>=numberOfPokemons){
            currentPage= currentPage;
        }
        else {
        currentPage += 1;
        }
    }
    if (next === false){ 
        if(page<=0) {
        currentPage= 0;
        } else {
        currentPage -= 1;
        }
    }

    page = eachPageLimit * currentPage;
    if((page+eachPageLimit)>numberOfPokemons) {
        let tempLimit= 0;
        tempLimit= numberOfPokemons-page;
        getPokemons(tempLimit,page);
        tempPokemons=numberOfPokemons;
    } else {
        getPokemons(eachPageLimit, page);
        tempPokemons=page+eachPageLimit;
    }

    const display = document.querySelector('.display-options');
    display.innerText=`Displaying ${numberOfPokemons} pokemons (Showing from ${page+1} - ${tempPokemons})`;

}

function setPaginationButtons() {

    const pagination = document.createElement('div');
    pagination.setAttribute('class', 'pagination-container');

    const pages = document.createElement('div');
    pages.setAttribute('class', 'pages');

    pagination.append(pages);

    const numberOfPages = numberOfPokemons / eachPageLimit;

    const prevButton = document.createElement('button');
    prevButton.setAttribute('class', 'page-button');
    prevButton.setAttribute('onclick', 'updatePage(false)');
    prevButton.innerText = 'Prev';

    pages.append(prevButton);

    for (let i = 0; i < numberOfPages; i++) {
        let eachPageButton = document.createElement('button');
        eachPageButton.setAttribute('class', 'page-button');
        eachPageButton.setAttribute('onclick', `updatePage(${i + 1})`);
        eachPageButton.innerText = i + 1;
        pages.append(eachPageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.setAttribute('class', 'page-button');
    nextButton.setAttribute('onclick', 'updatePage(true)');
    nextButton.innerText = 'Next';

    pages.append(nextButton);

    pagination.append(pages);

    document.body.append(pagination);
}

function refreshData(){

    const inputValue= document.querySelector('.input-text');
    numberOfPokemons= inputValue.value;
    if(inputValue.value==='') numberOfPokemons=60;
    if(inputValue.value>120) {
        inputValue.value= 'Enter a number below 121';
        inputValue.style.color='red';
    } else {
    document.querySelector('.pagination-container').remove();
    currentPage=0;
    updatePage(1);
    setPaginationButtons();
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomColor() {
    const colors = ['skyblue', 'lightpink', 'dogerblue', 'crimson', 'gold', 'red', 'forestgreen', 'orange'];
    return colors[(Math.floor(Math.random(0, (colors.length - 1)) * 10)).toFixed()];
}


updatePage(1);
setPaginationButtons();