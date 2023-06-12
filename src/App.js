import React, { useEffect } from "react";
import { useState } from "react";
import "./Styles.css";
import Tabela from "./components/tabela/Tabela.js";
import Simulador from "./components/simulador/Simulador.js";
import criarRodadas from "./scripts/criarRodadas.js";
import sortTabela from './scripts/sortTabela'

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
let nomesCompletos = [
    "América-MG",
    "Bahia",
    "Botafogo",
    "Atlético-MG",
    "Athletico",
    "Coritiba",
    "Corinthians",
    "Cruzeiro",
    "Cuiabá",
    "Flamengo",
    "Fluminense",
    "Fortaleza",
    "Goiás",
    "Grêmio",
    "Internacional",
    "Palmeiras",
    "RB Bragantino",
    "Santos",
    "São Paulo",
    "Vasco",
  ];

var placares = [];
var chanceGolsCasa = [];
var chanceGolsVisitante = [];
var tempTabela = [];
var insertSQL = 0

function App() {
    let [jogos, setJogos] = useState([]);
    let [id, setId] = useState(0);
    let [menu, setMenu] = useState([]);
    let [tabela, setTabela] = useState([]);

    const insertTimes = async (time) => {  
        try{
			const response = await fetch(`https://simuladorbr-server.up.railway.app/times`,{
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(time)
			})
		} catch(err){
			console.error(err)
		}       
    }

    const updateTimes = async (time) => {  
        try{
			const response = await fetch(`https://simuladorbr-server.up.railway.app/times/${time.id}`,{
				method: "PUT",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(time)
			})

            /* setTimeout(() => {
                getTimes()
            }, 600);*/            
            
		} catch(err){
			console.error(err)
		}  
        
    }

    const getTimes = async (time) => {  
        try{
			const response = await fetch(`https://simuladorbr-server.up.railway.app/times`)
            const json = await response.json()
            //setTabela(json)
		} catch(err){
			console.error(err)
		}  
    }
    
    function registraCasa(id, value) {
        if (((value === '' && jogos[id].golsVisitante !== '' && jogos[id].golsCasa !== '') || (value != jogos[id].golsCasa && jogos[id].golsVisitante !== '' && jogos[id].golsCasa !== ''))){
            removeResultado(id)
            updateTimes(tempTabela.filter(time => {return time.id.includes(jogos[id].nomeCasa)})[0])
            updateTimes(tempTabela.filter(time => {return time.id.includes(jogos[id].nomeVisitante)})[0])
        }

        jogos[id].golsCasa = value;

        registraResultado(id)
    
        setJogos([...jogos]);
    }

    function registraVisitante(id, value) {
        if (((value === '' && jogos[id].golsVisitante !== '' && jogos[id].golsCasa !== '') || (value != jogos[id].golsVisitante && jogos[id].golsCasa !== '' && jogos[id].golsVisitante !== ''))){
            removeResultado(id)
            updateTimes(tempTabela.filter(time => {return time.id.includes(jogos[id].nomeCasa)})[0])
            updateTimes(tempTabela.filter(time => {return time.id.includes(jogos[id].nomeVisitante)})[0])
        }
        
        jogos[id].golsVisitante = value;

        registraResultado(id)
        
        setJogos([...jogos]);
    }

    function pesoRandom() {
        var pesoCasa = [23, 40, 21, 9, 6, 1];
        var pesoVisitante = [36, 39, 18, 5, 1, 1];
        var j = 0;

        while (j < pesoCasa.length) {
            for (let i = 0; i < pesoCasa[j]; i++) {
                chanceGolsCasa[chanceGolsCasa.length] = j;
            }

            for (let i = 0; i < pesoVisitante[j]; i++) {
                chanceGolsVisitante[chanceGolsVisitante.length] = j;
            }

            j++;
        }
    }

    function marcaGols() {
        for (let i = 0; i < jogos.length; i++) {
            var golCasa = Math.floor(Math.random() * 100);
            var golVisitante = Math.floor(Math.random() * 100);
            golCasa = chanceGolsCasa[golCasa];
            golVisitante = chanceGolsVisitante[golVisitante];
            document.getElementById("golsCasa" + i).value = golCasa;
            document.getElementById("golsVisitante" + i).value = golVisitante;

            placares[i] = {
                id: i,
                nomeCasa: jogos[i].nomeCasa,
                golsCasa: golCasa,
                nomeVisitante: jogos[i].nomeVisitante,
                golsVisitante: golVisitante,
            };

            jogos[i] = placares[i];            
        }       

        setJogos([...jogos]);
        marcaResultados()
        
    }

    function resetaGols() {
        for (let i = 0; i < jogos.length; i++) {
            document.getElementById("golsCasa" + i).value = "";
            document.getElementById("golsVisitante" + i).value = "";

            placares[i] = {
                id: i,
                nomeCasa: jogos[i].nomeCasa,
                golsCasa: "",
                nomeVisitante: jogos[i].nomeVisitante,
                golsVisitante: "",
            };

            jogos[i] = placares[i];            
        }

        setJogos([...jogos]);
        criarTabela()
    }

    const criarCampeonato = () => {
        criarMenu();
        pesoRandom();        

        if (jogos.length) {
            jogos = [];
            setJogos(jogos);
            id = 0;
            setId(id);
        }
        
        setJogos(criarRodadas());

        setTimeout(() => {
            scrollRodada(id);
        }, 500);

        criarTabela();
    };

    function scrollRodada(id) {
        const elem = document.getElementById(id);
        elem.scrollIntoView({ block: "nearest" });
    }

    function proxRodada() {
        id += 10;
        setId(id);
        scrollRodada(id);
    }

    function antRodada() {
        id -= 10;
        setId(id);
        scrollRodada(id);
    }

    function atualizaId(item) {
        item = (item - 1) * 10;
        id = item;
        setId(id);
        scrollRodada(id);
    }

    function criarMenu() {
        for (let i = 0; i < 38; i++) {
            menu[i] = i + 1;
        }

        setMenu(menu);
    }

    function listaRodadas() {
        document.getElementById("menu").classList.toggle("show");
        document.getElementById("seta").classList.toggle("show");
    }

    window.onclick = function (event) {
        if (!event.target.matches(".navbar__rodada")) {
            var menu = document.getElementsByClassName("menu__conteudo");
            var i;
            for (i = 0; i < menu.length; i++) {
                var abreMenu = menu[i];
                if (abreMenu.classList.contains("show")) {
                    abreMenu.classList.remove("show");
                }
            }
        }
    };

    /**
     *  let golCasa = document.getElementById("golsCasa" + i).value
        let golVisitante = document.getElementById("golsVisitante" + i).value
        if (golCasa > '' && golVisitante > ''){
                tempTabela[i] = {}
        } */

    function criarTabela(){
        for (let i = 0; i < times.length; i++){
            tempTabela[i] = {
                id: times[i],
                pos: i+1,
                nome: nomesCompletos[i],
                pontos: 0,
                jogos: 0,
                v: 0,
                e: 0,
                d: 0,
                gp: 0,
                gc: 0,
                sg: 0,
                pctg: 0,
            }
            
            tabela[i] = tempTabela[i]
            updateTimes(tabela[i])
        }              

        setTabela(tabela)
    }

    function pontuarTabela(i){
        var nomeCasa = tempTabela.filter(time => {return time.id.includes(jogos[i].nomeCasa)})[0] 
        var nomeVisitante = tempTabela.filter(time => {return time.id.includes(jogos[i].nomeVisitante)})[0] 

        if (nomeCasa.golsCasa === '' && nomeVisitante.golsVisitante === ''){
            console.log('0')
            return
        }

        nomeCasa.jogos += 1
        nomeVisitante.jogos += 1
        
        nomeCasa.gp += parseInt(jogos[i].golsCasa)
        nomeVisitante.gp += parseInt(jogos[i].golsVisitante)
        nomeCasa.gc += parseInt(jogos[i].golsVisitante)
        nomeVisitante.gc += parseInt(jogos[i].golsCasa)

        nomeCasa.sg = nomeCasa.gp - nomeCasa.gc
        nomeVisitante.sg = nomeVisitante.gp - nomeVisitante.gc

        if(jogos[i].golsCasa > jogos[i].golsVisitante){
            nomeCasa.pontos += 3
            nomeCasa.v += 1                
            nomeVisitante.d +=1
        }

        else if(jogos[i].golsCasa === jogos[i].golsVisitante){
            nomeCasa.pontos += 1
            nomeVisitante.pontos += 1
            nomeCasa.e += 1
            nomeVisitante.e +=1          
        }
        
        else{
            nomeVisitante.pontos += 3                 
            nomeCasa.d += 1               
            nomeVisitante.v += 1     
        }

        nomeCasa.pctg = nomeCasa.jogos === 0? 0: parseInt(100*nomeCasa.pontos/(3*nomeCasa.jogos))
        nomeVisitante.pctg = nomeVisitante.jogos === 0? 0: parseInt(100*nomeVisitante.pontos/(3*nomeVisitante.jogos))
        sortTabela(tempTabela)
    }   
    

    function marcaResultados(){
        criarTabela()

        for (let i = 0; i < jogos.length; i++){
            pontuarTabela(i)
        }

        for (let i = 0; i < tempTabela.length; i++){
            setTimeout(() => {
                updateTimes(tempTabela[i]) 
            }, 90);                                 
        }
        
        setTabela(tempTabela)
    }

    function removeResultado(i){   
        var nomeCasa = tempTabela.filter(time => {return time.id.includes(jogos[i].nomeCasa)})[0] 
        var nomeVisitante = tempTabela.filter(time => {return time.id.includes(jogos[i].nomeVisitante)})[0] 
         
        nomeCasa.jogos -= 1
        nomeVisitante.jogos -= 1
        
        nomeCasa.gp -= parseInt(jogos[i].golsCasa)
        nomeVisitante.gp -= parseInt(jogos[i].golsVisitante)
        nomeCasa.gc -= parseInt(jogos[i].golsVisitante)
        nomeVisitante.gc -= parseInt(jogos[i].golsCasa)

        nomeCasa.sg = nomeCasa.gp - nomeCasa.gc
        nomeVisitante.sg = nomeVisitante.gp - nomeVisitante.gc

        if(jogos[i].golsCasa > jogos[i].golsVisitante){
            nomeCasa.pontos -= 3
            nomeCasa.v -= 1                
            nomeVisitante.d -=1
        }

        else if(jogos[i].golsCasa === jogos[i].golsVisitante){
            nomeCasa.pontos -= 1
            nomeVisitante.pontos -= 1
            nomeCasa.e -= 1
            nomeVisitante.e -=1
            
        }
        
        else{
            nomeVisitante.pontos -= 3                 
            nomeCasa.d -= 1               
            nomeVisitante.v -= 1     
        }

        nomeCasa.pctg = nomeCasa.jogos === 0? 0: parseInt(100*nomeCasa.pontos/(3*nomeCasa.jogos))
        nomeVisitante.pctg = nomeVisitante.jogos === 0? 0: parseInt(100*nomeVisitante.pontos/(3*nomeVisitante.jogos))
        
        sortTabela(tempTabela)
        setTabela(tempTabela)        
    }

    function registraResultado(i){
        if (jogos[i].golsCasa !== '' && jogos[i].golsVisitante !== ''){
            pontuarTabela(i)
            updateTimes(tempTabela.filter(time => {return time.id.includes(jogos[i].nomeCasa)})[0]) 
            updateTimes(tempTabela.filter(time => {return time.id.includes(jogos[i].nomeVisitante)})[0]) 
            removeDestaca(jogos[i].nomeCasa, jogos[i].nomeVisitante)
            //removeDestaca(jogos[i].nomeCasa, jogos[i].nomeVisitante)
        }

        setTabela(tempTabela)
        
        setTimeout(() => {
            destaca(jogos[i].nomeCasa, jogos[i].nomeVisitante)
        }, 100);        
    } 

    function destaca(nomeCasa, nomeVisitante){
        const elcasa = document.querySelector("div.linha div[id="+nomeCasa+"]")
        const elvisitante = document.querySelector("div.linha div[id="+nomeVisitante+"]")

        elcasa.classList.add('destaca')
        elvisitante.classList.add('destaca')
    }

    function removeDestaca(nomeCasa, nomeVisitante){
        const elcasa = document.querySelector("div.linha div[id="+nomeCasa+"]")
        const elvisitante = document.querySelector("div.linha div[id="+nomeVisitante+"]")

        elcasa.classList.remove('destaca')
        elvisitante.classList.remove('destaca')
    }
    

    return (
        <div className="app">
            <div className="app__abas">
                <Tabela 
                    tabela = {tabela}
                />
                <Simulador 
                    menu = {menu}
                    jogos = {jogos}
                    id = {id}
                    registraCasa = {registraCasa}
                    registraVisitante = {registraVisitante}
                    marcaGols = {marcaGols}
                    resetaGols = {resetaGols}
                    criarCampeonato = {criarCampeonato}
                    proxRodada = {proxRodada}
                    antRodada = {antRodada}
                    atualizaId = {atualizaId}
                    listaRodadas = {listaRodadas}
                    destaca = {destaca}
                    removeDestaca = {removeDestaca}
                />
            </div>
        </div>
    );
}

export default App;
