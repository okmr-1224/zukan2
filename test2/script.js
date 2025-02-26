let pokemonData = [];

// JSON ファイルを読み込む
fetch("pokemon_data.json")
    .then(response => response.json())
    .then(data => {
        pokemonData = data;
        console.log("データ読み込み完了", pokemonData);
    })
    .catch(error => console.error("JSON の読み込みに失敗しました", error));

// 検索ボタンがクリックされたら実行
document.getElementById("searchButton").addEventListener("click", () => {
    const input = document.getElementById("pokemonInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // 結果をリセット

    let foundPokemon;

    // 数字なら図鑑番号、文字ならポケモン名で検索
    if (!isNaN(input)) {
        const number = parseInt(input);
        foundPokemon = pokemonData.find(pokemon => pokemon.id === number);
    } else {
        foundPokemon = pokemonData.find(pokemon => 
            pokemon.japanese_name === input || 
            pokemon.english_name.toLowerCase() === input.toLowerCase()
        );
    }

    if (!foundPokemon) {
        resultDiv.innerHTML = "<p>ポケモンが見つかりませんでした。</p>";
        return;
    }

    // 検索結果を表示
    resultDiv.innerHTML += `
        <h2>${foundPokemon.japanese_name}</h2>
        <p>${foundPokemon.japanese_yurai}<br><br><br></p>
        <h2>${foundPokemon.english_name}</h2>
        <p>${foundPokemon.english_yurai}<br><br><br></p>
    `;

    foundPokemon.varieties.forEach(variety => {
        resultDiv.innerHTML += `
            <div class="pokemon">
                <p style="color:#A9A9A9">${variety.form_name}</p>
                <img src="${variety.official_artwork}" alt="${variety.form_name}">
            </div>
        `;
    });
});
