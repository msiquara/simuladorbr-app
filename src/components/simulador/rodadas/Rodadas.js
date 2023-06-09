import React from "react";
import "./Styles.css";
import Jogo from './jogo/Jogo'

function Rodadas({ jogos, registraCasa, registraVisitante, id, menu, proxRodada, antRodada, atualizaId, listaRodadas}) { 
    return (        
        <div className="rodadas__main">    
            <div className="rodadas__navbar">
                <button
                    className="navbar__anterior botao"
                    disabled={id == 0}
                    onClick={antRodada}
                >
                    ❮
                </button>
                <div
                    id="rodada"
                    className="navbar__rodada"
                    onClick={listaRodadas}
                >
                    {"Rodada " + (id + 10) / 10}
                    <span id="seta">▾</span>
                    <div id="menu" className="menu__conteudo">
                        {menu.map((item) => {
                            return (
                                <a
                                    id={"rodada" + item}
                                    onClick={() => atualizaId(item)}
                                    key={item}
                                >
                                    {"Rodada " + item}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <button
                    className="navbar__proximo botao"
                    disabled={jogos.length == 0 || id == 370}
                    onClick={proxRodada}
                >
                    ❯
                </button>
            </div>  

            <ul className="rodadas__container">    
                {jogos.map((jogo) => (
                    <Jogo
                        id = {jogo.id}
                        nomeCasa = {jogo.nomeCasa}                        
                        nomeVisitante = {jogo.nomeVisitante}
                        registraCasa = {registraCasa}
                        registraVisitante={registraVisitante}
                        golsCasa = {jogo.golsCasa}
                        golsVisitante = {jogo.golsVisitante}       
                    />                    
                ))}             
                <div style={{height:'40px'}} ></div>   
            </ul>     
        </div>                   
    );
}

export default Rodadas;