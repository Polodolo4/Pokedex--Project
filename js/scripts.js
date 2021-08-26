let pokemonRepository = (function() {
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');
  let modalCLose = document.createElement('button');
    modalCLose.classList.add(modal-close);
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

  function add(pokemon){
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

//show modal
function showModal() {
  modalContainer.classList.add('is-visible');
}

//hide modal
function hideModal() {
  modalContainer.classList.remove('is-visible');
}

//close modal
  modalCLose.addEventListener('click', hideModal);

//close upon escape keydown
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

//close when clicking outside modal
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      pokemonName.innerHTML = pokemon.name;
      pokemonHeight.innerHTML = 'Height:' + pokemon.height;
      pokemonType.innerHTML = 'Type:' + pokemon.types;
      pokemonWeight.innerHTML = 'Weight:' + pokemon.weight;
      pokemonImage.src = pokemon.imageUrl;
      modalCLose.innerHTML = 'Close';
        showModal();
  });

    modal.appendChild(modalCLose);
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
    addListItem:addListItem,
    loadDetails: loadDetails,
    loadList:loadList,
    showModal: showModal,
    hideModal: hideModal
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
