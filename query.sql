UPDATE classificacao SET pontos = 3, jogos = 1, v = 1, e = 0, d = 0, gp = 3, gc =0, sg = 3, pctg = 100 where id = 'AME0';

SELECT * FROM classificacao ORDER BY pontos desc, v desc, sg desc, gp desc, nome; 

delete from classificacao where pos >= 0;

INSERT INTO classificacao (id, pos, nome, pontos, jogos, v, e, d, gp, gc, sg, pctg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);


WITH classificacao AS (SELECT *, ROW_NUMBER() OVER(ORDER BY pontos desc, v desc, sg desc, gp desc, nome) AS rn FROM tabela)
UPDATE tabela SET pos = (SELECT rn FROM classificacao WHERE classificacao.pos = tabela.pos);
SELECT * FROM tabela ORDER BY pontos desc, v desc, sg desc, gp desc, nome