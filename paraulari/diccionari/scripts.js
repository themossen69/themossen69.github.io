let i = 0;
let inicialized = false;
let intro = "Prem les fletxes per anar passant les paraules una a una i gaudeix de les seves definicions!";

// load data
fetch("../words.json")
    .then(response => response.json()) // dades es llegeixen com a json
    .then(data => game_init(data));    // amb les dades, inicialitzem el joc

function game_init(data) {
    let len_data = data.length;
    const words = data.map(d => (d.word));
    const defs = data.map(d => (d.definition));

    const word = document.createElement("h2");
    const def = document.createElement("p");
    def.innerText = intro;
    word.classList.add("dic-title");
    def.classList.add("trippy-lesbian");

    const container = document.getElementsByClassName("container")[0];
    container.prepend(def);
    container.prepend(word);

    const btn_left = document.querySelector(".arrow-left");
    const btn_right = document.querySelector(".arrow-right");

    function next_word() {
        if (!inicialized) {
            inicialized = true;
            i = -1;
        }
        i = (i + 1) % len_data;
        update();
    }

    function prev_word() {
        if (!inicialized) inicialized = true;
        i = (i - 1 + len_data) % len_data;
        update();
    }

    function update() {
        word.innerText = `${i + 1}. ${words[i]}`;
        def.innerText = defs[i];
    }

    document.addEventListener('keydown', function (event) {
        // Comprovem si la tecla premuda és la fletxa dreta
        if (event.key === "ArrowRight") {
            next_word();
        } else if (event.key === "ArrowLeft") {
            prev_word();
        }
    });

    // Clics a les fletxes
    btn_right.addEventListener('click', next_word);
    btn_left.addEventListener('click', prev_word);
}
