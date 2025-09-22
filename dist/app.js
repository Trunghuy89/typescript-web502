"use strict";
const app = document.querySelector("#app");
const count = 12; // lấy 12 pokemon
// Hàm xáo trộn mảng
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
async function getPokemons() {
    const pokemons = [];
    for (let i = 1; i <= count; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await res.json();
        const p = {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            type: data.types[0].type.name
        };
        pokemons.push(p);
    }
    return shuffle(pokemons);
}
function render(list) {
    app.innerHTML = list.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}">
      <h3>#${p.id} ${p.name}</h3>
      <p>Type: ${p.type}</p>
    </div>
    
  `).join("");
}
getPokemons().then(render).catch(err => {
    console.error(err);
    app.textContent = "Failed to load pokemons.";
});
