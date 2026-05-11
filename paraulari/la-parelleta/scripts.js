let selected_word = null;
let selected_definition = null;

// load data
fetch("../words.json")
    .then(response => response.json()) // dades es llegeixen com a json
    .then(data => game_init(data));    // amb les dades, inicialitzem el joc


function game_init(data) {
    // limitar a 10 paraules random
    data = mix_array(data).slice(0, 10);
    const col_words = document.getElementsByClassName("button-word-column")[0];
    const col_defs = document.getElementsByClassName("button-definition-column")[0];

    const words = data.map(d => ({ id: d._id, text: d.word }));
    const defs = data.map(d => ({ id: d._id, text: d.definition }));

    mix_array(words).forEach(w => {
        col_words.appendChild(create_button(w, "word"));
    });

    mix_array(defs).forEach(d => {
        col_defs.appendChild(create_button(d, "definition"));
    });

}

function mix_array(a) {
    return a.sort(() => Math.random() - 0.5);
}

function create_button(item, type) {
    const button = document.createElement("button");
    button.innerText = item.text;
    button.dataset.id = item.id;

    button.classList.add("yellow-button");
    button.classList.add("game-button");

    button.onclick = () => {
        if (type === "word") {
            if (selected_word) selected_word.classList.remove("selected");
            selected_word = button;
            button.classList.add("selected");
        } else if (type === "definition") {
            if (selected_definition) selected_definition.classList.remove("selected");
            selected_definition = button;
            button.classList.add("selected");
        }
        check_pair();
    };
    return button;
}

function check_pair() {
    if (selected_word && selected_definition) {
        if (selected_word.dataset.id === selected_definition.dataset.id) {
            // Si son parella
            selected_word.classList.replace("selected", "correct");
            selected_definition.classList.replace("selected", "correct");
            selected_word = null;
            selected_definition = null;
        } else {
            // Si no son parella
            const word_to_reset = selected_word;
            const def_to_reset = selected_definition;

            word_to_reset.classList.add("incorrect");
            def_to_reset.classList.add("incorrect");

            setTimeout(() => {
                word_to_reset.classList.remove("incorrect", "selected");
                def_to_reset.classList.remove("incorrect", "selected");
            }, 2000);

            selected_word = null;
            selected_definition = null;
        }
    }
}
