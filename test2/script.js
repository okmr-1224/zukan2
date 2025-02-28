let pokemonData = [];
let currentPokemonId = 24; // 現在のポケモンID

// JSONデータを外部から取得
fetch("pokemon_data.json")
    .then(response => response.json())
    .then(data => {
        pokemonData = data;
    })
    .catch(error => console.error("Error loading Pokémon data:", error));

// 検索ボタンのイベントリスナー
document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("pokemonInput").value.trim();
    searchPokemon(query);
    showMessage("検索完了！");
});

// 「前のポケモン」ボタン
document.getElementById("prevButton").addEventListener("click", () => {
    if (currentPokemonId > 1) {
        document.getElementById("pokemonInput").value = currentPokemonId - 1;
        searchPokemon(currentPokemonId - 1);
    }
});

// 「次のポケモン」ボタン
document.getElementById("nextButton").addEventListener("click", () => {
    if (currentPokemonId < pokemonData.length) {
        document.getElementById("pokemonInput").value = currentPokemonId + 1;
        searchPokemon(currentPokemonId + 1);
    }
});

function searchPokemon(query) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // 結果をリセット

    // 図鑑番号または名前で検索
    let foundPokemon = pokemonData.find(pokemon =>
        pokemon.id === parseInt(query) ||
        pokemon.japanese_name === query ||
        pokemon.english_name.toLowerCase() === (typeof query === "string" ? query.toLowerCase() : "")
    );

    foundPokemon
        ? showToast("検索完了！", "success")
        : showToast("ポケモンが見つかりませんでした💦", "error")


    // 現在のポケモンIDを更新
    currentPokemonId = foundPokemon.id;

    // 検索結果を表示
    resultDiv.innerHTML += `
        <h2>${foundPokemon.japanese_name}</h2>
        <p>${foundPokemon.japanese_yurai}</p>
        <h2>${foundPokemon.english_name}</h2>
        <p>${foundPokemon.english_yurai}</p>
    `;

    foundPokemon.varieties.forEach(variety => {
        resultDiv.innerHTML += `
            <div class="pokemon">
                <p>${variety.form_name}</p>
                <img src="${variety.official_artwork}" alt="${variety.form_name}">
            </div>
        `;
    });

}

function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    if (type === "error") {
        toast.style.background = "#ff4444";
    } else if (type === "success") {
        toast.style.background = "#44ff44";
    }

    document.body.appendChild(toast);
    toast.style.display = "block";

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

