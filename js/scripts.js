pokemonRepository = (function() {
  let pokedex = document.querySelector('.list-group');
  let modalContainer = document.querySelector('#pokedex-modal');
  let modal = document.querySelector('.modal-content');

  let pokemonName = document.createElement('h1');
  pokemonName.classList.add('Pokemon-name');
  let pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('Pokemon-height');
  let pokemonType = document.createElement('p');
  pokemonType.classList.add('Pokemon-type');
  let pokemonWeight = document.createElement('p');
  pokemonWeight.classList.add('Pokemon-weight');

  let imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('Pokemon-image');

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.createElement('li');
    pokemonList.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.type = 'button';
    button.classList.add('btn', 'btn-primary');
    button.dataset.toggle = 'modal';
    button.dataset.target = '#pokemon-modal';
    button.classList.add('button-class');
    pokedex.appendChild(pokemonList);
    pokemonList.appendChild(button);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types[0].type.name;
        item.weight = details.weight;
      })
      .catch(function(e) {
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      pokemonName.innerHTML = pokemon.name;
      pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
      pokemonType.innerHTML = 'Type: ' + pokemon.types;
      pokemonWeight.innerHTML = 'Weight: ' + pokemon.weight;
      pokemonImage.src = pokemon.imageUrl;
    });

    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonType);
    modal.appendChild(pokemonWeight);
    modal.appendChild(imageContainer);
    imageContainer.appendChild(pokemonImage);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    loadList: loadList
  };
})();

/*writes the pokemon name and height to the DOM
for (let i =0; i < pokemonList.length; i++){
  document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height})  </p>`);
} */
/*highlights Onix and only Onix as a big! pokemon using a for loop
for (let i =0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 8) {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big! </p>`);
  } else {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height})  </p>`);
  }
}*/
/*highlights Onix and only Onix as a big! pokemon using a forEach loop
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 8) {
    document.write(`<p> ${pokemon.name} (height: ${pokemon.height}) - Wow, that's big! </p>`);
  } else {
    document.write(`<p> ${pokemon.name} (height: ${pokemon.height})  </p>`);
  }
});*/
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
