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
const shuffleArray = () => {
    for (let i = times.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = times[i];
        times[i] = times[j];
        times[j] = temp;
    }
};

function sortRodadas() {
    shuffleArray();
    var shuffleTimes = [];
    shuffleTimes = shuffleTimes.concat(times);
    var lista1 = shuffleTimes.slice(0, 10);
    var lista2 = shuffleTimes.slice(10);
    var matrizTimes = [[lista1], [lista2]];

    for (let i = 0; i < times.length - 1; i++) {
        for (let j = 0; j < times.length / 2; j++) {
            if (i % 2 == 0) {
                jogosList = jogosList.concat({
                    id: jogosList.length,
                    nomeCasa: matrizTimes[0][0][j],
                    golsCasa: "",
                    nomeVisitante: matrizTimes[1][0][j],
                    golsVisitante: "",
                });

                jogosList2t = jogosList2t.concat({
                    id: jogosList.length + 189,
                    nomeCasa: matrizTimes[1][0][j],
                    golsCasa: "",
                    nomeVisitante: matrizTimes[0][0][j],
                    golsVisitante: "",
                });
            } else {
                jogosList = jogosList.concat({
                    id: jogosList.length,
                    nomeCasa: matrizTimes[1][0][j],
                    golsCasa: "",
                    nomeVisitante: matrizTimes[0][0][j],
                    golsVisitante: "",
                });

                jogosList2t = jogosList2t.concat({
                    id: jogosList.length + 189,
                    nomeCasa: matrizTimes[0][0][j],
                    golsCasa: "",
                    nomeVisitante: matrizTimes[1][0][j],
                    golsVisitante: "",
                });
            }
        }

        var ultimo = matrizTimes[0][0].pop();
        var primeiro = matrizTimes[1][0].shift();

        matrizTimes[0][0].splice(1, 0, primeiro);
        matrizTimes[1][0] = matrizTimes[1][0].concat(ultimo);
    }
}

export default function criarRodadas() {
    sortRodadas();
    jogosList = jogosList.concat(jogosList2t);
    return jogosList;
}
