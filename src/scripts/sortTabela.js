export default function sortTabela(tabela){
    tabela.sort(function(a, b){
        return b.pontos - a.pontos || b.v - a.v || b.sg - a.sg || b.gp - a.gp || b.nome < a.nome
    })

    for (let i = 0; i < tabela.length; i++){
        tabela[i].pos = i+1
    }

    return tabela

}