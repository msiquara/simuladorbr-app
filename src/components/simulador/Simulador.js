import React from "react";
import "./Simulador.css";
import Rodadas from "./rodadas/Rodadas";

function Simulador({
    menu,
    jogos,
    id,
    registraCasa,
    registraVisitante,
    marcaGols,
    resetaGols,
    criarCampeonato,
    proxRodada,
    antRodada,
    atualizaId,
    listaRodadas,
    destaca, 
    removeDestaca
}) {
    return (
        <div className="simulador__main">
            <div className="simulador__botoes">
                <button className="botoes__criar" onClick={criarCampeonato}>
                    Criar Campeonato
                </button>
                <button className="botoes__preencher" disabled={jogos.length == 0} onClick={marcaGols}>
                    Marcar Gols
                </button>
                <button className="botoes__reset" disabled={jogos.length == 0} onClick={resetaGols}>
                    Reset
                </button>
            </div>
            
            <Rodadas
                jogos={jogos}
                registraCasa={registraCasa}
                registraVisitante={registraVisitante}
                id = {id}
                menu = {menu}
                proxRodada = {proxRodada}
                antRodada = {antRodada}
                atualizaId = {atualizaId}
                listaRodadas = {listaRodadas}
                destaca = {destaca}
                removeDestaca = {removeDestaca}
            />
        </div>
    );
}

export default Simulador;