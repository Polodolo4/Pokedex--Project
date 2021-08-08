let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: 'Butterfree',
      height: 1.1,
      type: ['bug', 'flying'],
      weight: 32,
    },
    {
      name: 'Starmie',
      height: 1.1,
      type: ['psychic', 'water'],
      weight: 80,
    },
    {
      name: 'Omastar',
      height: 1,
      type: ['water', 'rock'],
      weight: 35,
    },
    {
      name: 'Onix',
      height: 8.8,
      type: ['rock', 'ground'],
      weight: 210,
    },
  ];

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

function showDetails(pokemon) {
  console.log(pokemon.name);
}

  return {
   add: function(pokemon) {
     pokemonList.push(pokemon);
   },
   getAll: function() {
     return pokemonList;
   },
   addListItem: addListItem
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

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
