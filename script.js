const pokedex = document.getElementById("pokedex");

const pokeCache = {};

const fetchPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  const pokemon = data.results.map((result, index) => ({
    // or ...results,
    name: result.name,
    apiURL: result.url,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`
  }));

  displayPokemon(pokemon);
};

const displayPokemon = pokemon => {
  console.log("pokemon", pokemon);
  const pokemonHTMLString = pokemon
    .map(
      pokemon => `
      <div class="container">
      <li class="card" onClick="selectPokemon(${pokemon.id})">
      <img class="card-image" src="${pokemon.image}"/>
      <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>

      </li>
      </div>`
    )
    .join("");

  pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async id => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);

    pokeCache[id] = data;
    console.log("data in pokecache", data);

    displayPopup(data);
  }
  displayPopup(pokeCache[id]);
};

const displayPopup = data => {
  const pokemontype = data.types.map(type => type.type.name).join(", ");

  const image = data.sprites["front_default"];

  const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card" >
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">${data.id}. ${data.name}</h2>
            <p>Height: ${data.height} | weight: ${data.weight} | Type: ${pokemontype} </p>

        </div>
    </div>`;

  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
  const popup = document.querySelector(".popup");
  popup.parentElement.removeChild(popup);
};

fetchPokemon();
