let times = [
    "AME",
    "BAH",
    "BOT",
    "CAM",
    "CAP",
    "CFC",
    "COR",
    "CRU",
    "CUI",
    "FLA",
    "FLU",
    "FOR",
    "GOI",
    "GRE",
    "INT",
    "PAL",
    "RBB",
    "SAN",
    "SAO",
    "VAS",
];
let jogosList = [];
let jogosList2t = [];
let jogo = ["", ""];

//fisher-yates
const shuffleArray = (times) => {
    for (let i = times.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = times[i];
        times[i] = times[j];
        times[j] = temp;
    }
};

function criarJogos(times, k, pos, jogo) {
    if (k == 0) {
        if (jogosList.length % 2 == 0){
            jogosList = jogosList.concat({
                id: jogosList.length,
                nomeCasa: jogo[0],
                golsCasa: '',
                nomeVisitante: jogo[1],
                golsVisitante: '',
            });
            jogosList2t = jogosList2t.concat({
                id: jogosList.length + 189,
                nomeCasa: jogo[1],
                golsCasa: '',
                nomeVisitante: jogo[0],
                golsVisitante: '',
            });
            return
        }

        jogosList = jogosList.concat({
            id: jogosList.length,
            nomeCasa: jogo[1],
            golsCasa: '',
            nomeVisitante: jogo[0],
            golsVisitante: '',
        });
        jogosList2t = jogosList2t.concat({
            id: jogosList.length + 189,
            nomeCasa: jogo[0],
            golsCasa: '',
            nomeVisitante: jogo[1],
            golsVisitante: '',
        });
        return    
    }

    for (let i = pos; i <= times.length - k; i++) {
        jogo[jogo.length - k] = times[i];
        criarJogos(times, k - 1, i + 1, jogo);
    }
}
/*
function sortRodadas(){
    for (let i = 0; i < jogosList.length; i++){

    }
}
*/
export default function criarRodadas() {
    jogosList = []
    jogosList2t = []
    shuffleArray(times);
    criarJogos(times, 2, 0, jogo);
    //sortRodadas()
    jogosList = jogosList.concat(jogosList2t);
    return jogosList;
}
