import React from 'react'
import './Styles.css'

function Tabela({tabela}) {
  return (
    <div className='container__tabela'>
        <div className='tabela__classificacao'>
            <div className='legenda'>
                <div className='colocacao'>#</div>
                <div className='time'>
                    <div id='nome'>Time</div>
                    <div id='p'>P</div>
                    <div id='j'>J</div>
                    <div id='v'>V</div>
                    <div id='e'>E</div>
                    <div id='d'>D</div>
                    <div id='gp'>GP</div>
                    <div id='gc'>GC</div>
                    <div id='sg'>SG</div>
                    <div id='pctg'>%</div>   
                </div> 
            </div>
            {tabela.map((time) => (
                <div className='linha' id={'linha'+time.pos} key={time.pos}>
                    <div className='colocacao'>{time.pos}</div>
                    <div className='time' id={time.id}>
                        <div id='nome'>{time.nome}</div>
                        <div id='p'>{time.pontos}</div>
                        <div id='j'>{time.jogos}</div>
                        <div id='v'>{time.v}</div>
                        <div id='e'>{time.e}</div>
                        <div id='d'>{time.d}</div>
                        <div id='gp'>{time.gp}</div>
                        <div id='gc'>{time.gc}</div>
                        <div id='sg'>{time.sg}</div>
                        <div id='pctg'>{time.pctg}</div>   
                    </div> 
                </div>
                                       
            ))} 
        </div>
                    
    </div>
  )
}

export default Tabela;
