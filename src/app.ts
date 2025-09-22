interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const app = document.querySelector<HTMLDivElement>("#app")!;
const count: number = 12; // lấy 12 pokemon

// Hàm xáo trộn mảng
function shuffle<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

async function getPokemons(): Promise<Pokemon[]> {
  const pokemons: Pokemon[] = [];
  for (let i = 1; i <= count; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    const p: Pokemon = {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      type: data.types[0].type.name
    };
    pokemons.push(p);
  }
  return shuffle(pokemons);
}

function render(list: Pokemon[]) {
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
