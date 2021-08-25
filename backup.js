
const api= 'https://pokeapi.co/api/v2/';
(function(){

    const header = document.createElement('header');
    header.setAttribute('class','header');

    const headerContainer= document.createElement('div');
    headerContainer.setAttribute('class','header-container');

    const imgLogo= document.createElement('div');
    imgLogo.setAttribute('class','img-logo');

    const logo= document.createElement('img');
    logo.setAttribute('src','https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png');
    logo.setAttribute('alt','');
    logo.setAttribute('class','logo');

    imgLogo.append(logo);

    const options= document.createElement('div');
    options.setAttribute('class','options');

    const displayOption= document.createElement('div');
    displayOption.setAttribute('class','display-options');

    options.append(displayOption);

    headerContainer.append(imgLogo,options);
    header.append(headerContainer);

    const section= document.createElement('section');
    section.setAttribute('class','container');

    document.body.append(header,section);

})();

function displayPokemons(pokemonDetails){

    const section = document.querySelector('.container');
    
    const pokemonContainer= document.createElement('div');
    pokemonContainer.setAttribute('class','pokemon-container');

    const imgContainer= document.createElement('div');
    imgContainer.setAttribute('class','img-container');
    imgContainer.style.backgroundColor=randomColor();

    const img = document.createElement('img');
    img.setAttribute('class','img');
    img.setAttribute('alt','');
    img.setAttribute('src',pokemonDetails.sprites.other.dream_world.front_default);

    imgContainer.append(img);
    pokemonContainer.append(imgContainer);

    const pokemonDetailsContainer= document.createElement('div');
    pokemonDetailsContainer.setAttribute('calss','pokemon-details');
    pokemonDetailsContainer.style.padding='20px';

    const pokemonName= document.createElement('div');
    pokemonName.setAttribute('class','name');

    const pokemonWeight= document.createElement('div');
    pokemonWeight.setAttribute('class','weight');

    // const pokemonWeightDipslay= document.createElement('span');
    // pokemonWeightDipslay.setAttribute('class','weight-tag');

    // pokemonWeight.append(pokemonWeightDipslay);
    // console.log(pokemonWeightDipslay);

    const pokemonAbility= document.createElement('div');
    pokemonAbility.setAttribute('class','ability');

    const pokemonMoves= document.createElement('div');
    pokemonMoves.setAttribute('class','moves');

    pokemonDetailsContainer.append(pokemonName,pokemonWeight,pokemonAbility,pokemonMoves);
    pokemonContainer.append(pokemonDetailsContainer);


    //pokemonName.innerText= pokemonDetails.name.toString().charAt(0).toUpperCase()+pokemonDetails.name.slice(1);
    pokemonName.innerText= capitalizeFirstLetter(pokemonDetails.name);
    pokemonWeight.innerHTML=`Weight: <span class="weight-tag"> ${pokemonDetails.weight} lbs </span>`;
    pokemonAbility.innerText='Abilities: ';
    pokemonDetails.abilities.forEach((ability)=>{
        pokemonAbility.innerHTML+= `<span class="ability-tag"> ${ability.ability.name} </span>`;
    })
    pokemonMoves.innerText='Moves: '
    for(let i=0;i<pokemonDetails.abilities.length;i++) {
        pokemonMoves.innerHTML+= `<span class="move-tag"> ${pokemonDetails.moves[i].move.name} </span> `;
    }
    // pokemonDetails.moves.forEach((eachMove)=>{
    //     pokemonMoves.innerHTML+= `<span class="move-tag"> ${eachMove.move.name} </span> `;
    // })
    pokemonMoves.innerHTML+= '<a href="">More..</a>'
    
    section.append(pokemonContainer);   

document.body.append(section);

}

async function getPokemons(limit,offset){
    
    const section = document.querySelector('.container');
    section.innerHTML=``;

    try{
        const data = await fetch(`${api}pokemon?limit=${limit}&offset=${offset}`);
        const pokemons=await data.json();
        //console.log(pokemons.results);
        //getPokemonNames(pokemons.results);
         pokemons.results.forEach((pokemon)=>{
             getPokemonDetails(pokemon.url);
         })

         setPaginationButtons();
    
        //getPokemons(eachPageLimit,page);
    } catch(msg){
        console.log(msg);
    }
    
}

async function getPokemonDetails(pokemon){
    
    try{
        const data = await fetch(`${pokemon}`);
        const pokemonDetails= await data.json();
        //console.log('Details:',pokemonDetails);
        //console.log('Abilities:',pokemonDetails.abilities);
       // displayAbilities(pokemonDetails.abilities);
        //console.log('Moves:',pokemonDetails.moves);
       // displayMoves(pokemonDetails.moves);
        //console.log('Weight:',pokemonDetails.weight);
        //console.log('Abilities length:',pokemonDetails.abilities.length);
        //console.log(pokemonDetails);
        //console.log(pokemonDetails.sprites.other.dream_world.front_default);
        displayPokemons(pokemonDetails);
        //getDetailsOfPokemon(pokemonDetails);
        //console.log(pokemonDetails);
    } catch(msg){
        console.log(msg);
    }

}

function updatePage(next){
console.log('button clicked');
if(next) currentPage+=1;
else{ 
    if(!currentPage<0) currentPage-=1;
}
   page= eachPageLimit*currentPage;
   getPokemons(eachPageLimit,page);
   console.log(eachPageLimit,page);
}

const numberOfPokemons= 60;
// let pokemonDetails;
// let pokemons;
let eachPageLimit= 12;
let currentPage= 0;
let page= eachPageLimit*currentPage;

console.log(eachPageLimit,page);
getPokemons(12,0);

function setPaginationButtons(){

    const pagination= document.createElement('div');
    pagination.setAttribute('class','pagination-container');

    const pages= document.createElement('div');
    pages.setAttribute('calss','pages');

    //pagination.append(pages);
    //const pages= document.querySelector('.pages');
    const numberOfPages= numberOfPokemons/eachPageLimit;

    for(let i= 0;i<numberOfPages;i++){
        let eachPageButton= document.createElement('button');
        eachPageButton.setAttribute('class','page-button');
        eachPageButton.setAttribute('onclick',`updatePage(${i+1})`);
        eachPageButton.innerText=i+1;
        console.log(eachPageButton);
        pages.append(eachPageButton);
    }
    pagination.append(pages);

    document.body.append(pagination);
}

setTimeout(()=>{
    updatePage(true);
},10000)



// async function getDetailsOfPokemon(data){
//     pokemonDetails= await data;
//     //console.log(pokemonDetails);
// }

//async function getPokemonNames(data){
    //pokemons= await data;
   // console.log(pokemons);
  //  displayOnPages(pokemons,currentPage,eachPage,page);

//   for(let i=page;i<eachPage*currentPage;i++){
//     getPokemonDetails(pokemons[i].url);
//     console.log(`page:${currentPage}`,pokemons[i].url);
//     }
//     page+=currentPage*eachPage;
//     console.log('page',page);
//     currentPage+=1;
//     console.log(currentPage);
//}

// function getData() {
// setTimeout(()=>{
//     if(pokemons===undefined) getData();
//     console.log(pokemons);
//     displayOnPages(pokemons,currentPage,eachPage,page);
// },1000);
// }

// getData();

//console.log(pokemons);
//displayOnPages(pokemons,currentPage,eachPage,page);



// function displayOnPages(pokemons,currentPage,eachPage,page){
//     pokemons= pokemons;
//     for(let i=page;i<eachPage*currentPage;i++){
//         getPokemonDetails(pokemons[i].url);
//         console.log(`page:${currentPage}`,pokemons[i].url);
//     }
//     page+=currentPage*eachPage;
//     console.log('page',page);
//     currentPage+=1;
//     console.log(currentPage);
// }

//console.log(`pokemons: ${pokemons}, current page: ${currentPage} each page: ${eachPage} now page ${page}`);

//displayOnPages(pokemons,currentPage,eachPage,page);

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
}

function randomColor(){
    const colors= ['skyblue','lightpink','dogerblue','crimson','gold','red','forestgreen','orange'];
    return colors[(Math.floor(Math.random(0,(colors.length-1))*10)).toFixed()];
}

// function displayAbilities(abilities){
//     abilities.forEach((ability)=>{
//         console.log(ability.ability.name);
//     })
// }

// function displayMoves(moves){
//     moves.forEach((move)=>{
//         console.log(move);
//     })
// }
