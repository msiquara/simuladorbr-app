import React from "react";
import "./Styles.css";

export default function Jogo({ id, nomeCasa, nomeVisitante, registraCasa, registraVisitante, golsCasa, golsVisitante}) {   
    return (
        <li className="jogo" id={id} key={id}>
            <div className="img__escudo" id={nomeCasa}>
                <img src={require("/src/img/" + nomeCasa.toLowerCase() + ".png")} alt={nomeCasa}/>
            </div>
            <div className="nome casa">{nomeCasa}</div>

            <div className="main__placar" id="main">
                <input
                    className="placar"
                    id={"golsCasa" + id}
                    value={golsCasa}
                    onChange={(e) => e.target.value.replace(/\D/g, '') == ''? registraCasa(id, ''): registraCasa(id, e.target.value)}
                    min={0}
                    max={9}
                    maxLength={1}
                ></input>
                <p>X</p>
                <input
                    className="placar"
                    id={"golsVisitante" + id}
                    value={golsVisitante}
                    onChange={(e) => e.target.value.replace(/\D/g, '') == ''? registraVisitante(id, ''): registraVisitante(id, e.target.value)}
                    min={0}
                    max={9}
                    maxLength={1}
                ></input>
            </div>
            
            <div className="nome visitante">{nomeVisitante}</div>
            <div className="img__escudo" id={nomeVisitante} >
                <img src={require("/src/img/" + nomeVisitante.toLowerCase() + ".png")} alt={nomeVisitante}/>
            </div>
        </li>
    );
}
